import { createContext, useContext, useReducer } from "react";
import { GET_ROLE, healthState, GET_ROLE_ERROR } from "../actions/Health";
import { assignContract } from "../contractEther/assign";
import { healthReducer } from "../reducers/health";

const HealthContext = createContext(healthState);
const HealthContract = assignContract();

const HealthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(healthReducer, healthState);

  return (
    <HealthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HealthContext.Provider>
  );
};

const useHealth = () => useContext(HealthContext);

const getRole = async (id) => {
  try {
    const resp = await HealthContract.getRole(id);
    const [type, _id, role] = resp;
    return { type: GET_ROLE, data: { type, _id, role: role.toString() } };
  } catch (e) {
    return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

export { HealthProvider, useHealth, getRole };

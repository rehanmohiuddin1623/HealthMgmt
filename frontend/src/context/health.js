import { createContext, useContext, useReducer } from "react";
import { GET_ROLE, healthState, GET_ROLE_ERROR } from "../actions/Health";
import assignContract from "../contractEther/assign";
import doctorContract from "../contractEther/doctor";
import patientContract from "../contractEther/patient";
import { healthReducer } from "../reducers/health";

const HealthContext = createContext(healthState);
const HealthContract = assignContract();
const PatientContract = patientContract();
const DoctorContract = doctorContract();

const HealthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(healthReducer, healthState);

  return (
    <HealthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HealthContext.Provider>
  );
};

const useHealth = () => useContext(HealthContext);

const getRole = async () => {
  try {
    const userString = localStorage.getItem("user")
    const userObj = JSON.parse(userString ?? {})
    const { isAuth = false, role = -1, _id, name } = userObj ?? {}
    const res = { type: GET_ROLE, data: {} };
    if (role === 0)
      res.data = { type: "ROOT", _id, role, name };
    else if (role === 1) res.data = { type: "DOCTOR", _id, role, name };
    else if (role === 2) res.data = { type: "PATIENT", _id, role, name };
    else res.data = { type: "INVALID", _id, role };
    return { ...res };
  } catch (e) {
    return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

export { HealthProvider, useHealth, getRole };

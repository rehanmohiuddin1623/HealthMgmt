import { createContext, useContext, useReducer } from "react";
import { GET_PATIENT_DATA, monitorState } from "../actions/Monitor";
import monitorContract from "../contractEther/monitor";
import monitorReducer from "../reducers/monitor";
import { toast } from "react-toastify";

const MonitorContext = createContext(monitorState);
const MonitorContract = monitorContract();

const MonitorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(monitorReducer, monitorState);

  return (
    <MonitorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MonitorContext.Provider>
  );
};

const useMonitor = () => useContext(MonitorContext);

const getPatientData = async (id) => {
  try {
    const totalLength = await MonitorContract.getAllPatientDataLength(id);
    const patientDataList = [];
    for (let i = 0; i < parseInt(totalLength); i++) {
      const patientData = await MonitorContract.getPatientData(id, i);
      const [_id, pulse, spo2, temp] = patientData;
      patientDataList.push({ _id: _id, pulse: pulse, spo2: spo2, temp: temp });
    }
    toast.success("Data Fetched Succesfully");
    return { type: GET_PATIENT_DATA, data: patientDataList };
  } catch (e) {
    console.log(e);
    toast.error("Oops ! Something Went Wrong");
    // return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

export { MonitorProvider, useMonitor, getPatientData };

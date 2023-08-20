import { createContext, useContext, useReducer } from "react";
import {
  ADD_PATIENT,
  GET_PATIENT,
  GET_PATIENTS,
  GET_ALL_PATIENTS,
  patientState,
} from "../actions/Patient";
import patientContract from "../contractEther/patient";
import patientReducer from "../reducers/patient";
import { toast } from "react-toastify";
import axios from "axios";
import { AxiosInstance } from "../AxiosInstance";

const PatientContext = createContext(patientState);
const PatientContract = patientContract();

const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientReducer, patientState);

  return (
    <PatientContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};

const usePatient = () => useContext(PatientContext);

const addPatient = async (payload) => {
  try {
    const { data } = await AxiosInstance.post(
      `admin/addPatient`,
      {
        ...payload
      }
    );
    const resp = data?.message ?? {}
    toast.success("Patient Added Succesfully");
    return { type: ADD_PATIENT, data: { ...resp } };
  } catch (e) {
    toast.error("Oops ! Something Went Wrong");
    // return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

const getAllPatients = async () => {
  try {
    const { data } = await AxiosInstance.get("/admin/getAllPatients");
    const patientDataList = data?.message || []
    return { type: GET_ALL_PATIENTS, data: [...patientDataList] };
  } catch (e) {
    console.log(e);
    // return { type: GET_ROLE_ERROR, data: { error: e.toString() } };
  }
};

export { PatientProvider, usePatient, addPatient, getAllPatients };

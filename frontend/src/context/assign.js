import { createContext, useContext, useReducer } from "react";
import assignContract from "../contractEther/assign";
import { toast } from "react-toastify";
import {
  assignState,
  ASSIGN_DOCTOR,
  GET_ASSIGNED_PATIENTS,
} from "../actions/Assign";
import assignReducer from "../reducers/assign";
import patientContract from "../contractEther/patient";
import { AxiosInstance } from "../AxiosInstance";

const AssignContext = createContext(assignState);
const AssignContract = assignContract();
const PatientContract = patientContract();

const AssignProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assignReducer, assignState);

  return (
    <AssignContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AssignContext.Provider>
  );
};

const useAssign = () => useContext(AssignContext);

const assignDoctor = async (doc_id, patient_id) => {
  try {
    const { data } = await AxiosInstance.put("admin/assignDoctor",null,{
      params:{
        doctor_id:doc_id,
        patient_id:patient_id
      }
    })
    toast.success("Doctor Assigned Successfully");
    return { type: ASSIGN_DOCTOR, data: { assigned: true } };
  } catch (e) {
    console.log(e);
    toast.error("Oops ! Something Went Wrong");
  }
};

const getPatientsAssigned = async (doctor_id) => {
  try {
    const { data } =
      await AxiosInstance.get("admin/getPatientsByDoctor",{
        params:{
          doctor_id:doctor_id
        }
      });
    const res = data?.message || {}
    toast.success("Fetched Assigned Patients Successfully");
    return { type: GET_ASSIGNED_PATIENTS, data: res };
  } catch (e) {
    console.log(e);
    toast.error("Oops ! Something Went Wrong");
  }
};

export { AssignProvider, useAssign, assignDoctor, getPatientsAssigned };

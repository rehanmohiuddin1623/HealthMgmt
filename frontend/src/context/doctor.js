import { createContext, useContext, useReducer } from "react";
import doctorContract from "../contractEther/doctor";
import { toast } from "react-toastify";
import { doctorState, GET_ALL_DOCTORS, GET_DOCTOR } from "../actions/Doctor";
import doctorReducer from "../reducers/doctor";
import axios from "axios";
import { AxiosInstance } from "../AxiosInstance"

const DoctorContext = createContext(doctorState);
const DoctorContract = doctorContract();

const DoctorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doctorReducer, doctorState);

  return (
    <DoctorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DoctorContext.Provider>
  );
};

const useDoctor = () => useContext(DoctorContext);

const addDoctor = async (payload, doctorData) => {
  try {
    const { data } = await AxiosInstance.post(
      `admin/addDoctor`,
      {
        ...payload
      }
    );
    const pId = data?.message || {};
    toast.success("Doctor Added Succesfully");
    return { type: GET_DOCTOR, data: { pId } };
  } catch (e) {
    toast.error("Oops ! Something Went Wrong");
  }
};

const getAllDoctors = async () => {
  try {
    const { data } = await AxiosInstance.get("/admin/getAllDoctors");
    const { message = [] } = data
    console.log("data", data)
    return { type: GET_ALL_DOCTORS, data: [...message] };
  } catch (e) {
    console.log(e);
  }
};

export { DoctorProvider, useDoctor, addDoctor, getAllDoctors };

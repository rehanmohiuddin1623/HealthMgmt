import {
  ADD_PATIENT,
  GET_ALL_PATIENTS,
  patientState,
} from "../actions/Patient";

const patientReducer = (state = patientState, action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_PATIENT:
      return {
        ...state,
        ...data,
      };
    case GET_ALL_PATIENTS:
      const allPatients = data;
      return {
        ...state,
        totalPatients: data,
        allPatients,
        allPatientDetails: allPatients,
      };
    default:
      return {
        ...state,
      };
  }
};

export default patientReducer;

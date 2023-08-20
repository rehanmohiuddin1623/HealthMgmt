import { ADD_DOCTOR, GET_ALL_DOCTORS, doctorState } from "../actions/Doctor";

const doctorReducer = (state = doctorState, action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_DOCTOR:
      return {
        ...state,
        ...data,
      };
    case GET_ALL_DOCTORS:
      return {
        ...state,
        totalDoctors: data,
        allDoctors: [...data],
      };
    default:
      return {
        ...state,
      };
  }
};

export default doctorReducer;

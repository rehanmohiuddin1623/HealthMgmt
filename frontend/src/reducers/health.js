import { GET_ROLE, healthState } from "../actions/Health";

export const healthReducer = (state = healthState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_ROLE:
      return {
        ...state,
        ...data,
      };
    default:
      return {
        ...state,
      };
  }
};

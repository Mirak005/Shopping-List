import { GET_ERRORS, CLEAR_ERRORS } from "./actionTypes";

//RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

//CLEAR ERRORS
export const clearErors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

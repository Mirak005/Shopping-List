import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT_SUCESS,
  REGISTER_SUCESS,
  REGISTER_FAIL
} from "../actions/actionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: false,
  user: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCESS:
    case REGISTER_SUCESS:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL :
    case LOGOUT_SUCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        token: localStorage.getItem("token"),
        isAuth: null,
        isLoading: false,
        user: null
      };
    default:
      return state;
  }
}

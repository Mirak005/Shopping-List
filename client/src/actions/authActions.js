import axios from 'axios'
import {clearErors , returnErrors} from '../actions/errorActions'
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

  //check token && load user

  export const loadUser = () => (dispatch , getState)=>{
      //User Loading 
      dispatch({ type : USER_LOADING });

      //Get token from localStoratge 
      const token = getState().auth.token
      //Headers 
      const config = {
          headers:{
              "Content-type":"application/json"
          }
      }

    // If token add to Headers
    if(token){
        config.headers["x-auth-token"] = token ;
    }
      axios
      .get("/api/auth/user" , config )
      .then(res => dispatch({
          type:USER_LOADED ,
          payload : res.data
      }))
      .catch(err=> {
          dispatch(returnErrors(err.response.data , err.response.status))
          dispatch({
              type:AUTH_ERROR
          })
      })
      
  }
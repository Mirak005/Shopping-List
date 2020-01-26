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
  //getState is store method 
  export const loadUser = () => (dispatch , getState)=>{
      //User Loading 
      dispatch({ type : USER_LOADING });

    
      axios
      .get("/api/auth/user" , tokenConfig(getState) )
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

  //Setup Confing/headers and token 
  export const tokenConfig = (getState) =>{
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
      return config ;
  }
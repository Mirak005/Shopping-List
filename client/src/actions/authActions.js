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
//Register User 
export const register = ({name , email , password})=> dispatch =>{
  // Headers 
    const config = {
        headers:{
            "Content-Type" : "application/json"
        }
    }
  //Request Body 
   const body = JSON.stringify({name,email,password})
   axios
   .post("/api/users" , body , config)
   .then(res => dispatch({
       type:REGISTER_SUCESS,
       payload: res.data
   }))
   .catch(err => {
       dispatch(returnErrors(err.response.data , err.response.status , REGISTER_FAIL))
       dispatch({
           type:REGISTER_FAIL
       })
   })
}
 //Logout User 
 export  const logout = () =>{
     return {type:LOGOUT_SUCESS}
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
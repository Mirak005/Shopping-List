import uuid from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM ,ITEMS_LOADING} from "../actions/actionTypes";

const iniState = {
  items: [],
  isLoading:false
};

export default function(state = iniState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state , 
        items:action.payload ,
         isLoading:false};
    case DELETE_ITEM:
      return {...state , items: state.items.filter(item => item._id !== action.payload) };
    case ADD_ITEM:
      return {...state ,  items: [action.payload, ...state.items] };
      case ITEMS_LOADING:
        return {...state ,isLoading:true }
    default:
      return state;
  }
}

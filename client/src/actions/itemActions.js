import axios from "axios";
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from "./actionTypes";

export const getItems = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get("/api/items")
    .then(res => dispatch({ type: GET_ITEMS, payload: res.data }));
};
export const addItem = newItem => dispatch => {
  axios
    .post("/api/items", newItem)
    .then(res => dispatch({ type: ADD_ITEM, payload: res.data }));
};
export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(() => dispatch({ type: DELETE_ITEM, payload: id }));
};

export const setItemLoading = () => {
  return { type: ITEMS_LOADING };
};

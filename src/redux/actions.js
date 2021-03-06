import { ADD_DIVE, SELECT_DIVE, EDIT_DIVE, DELETE_DIVE, INIT_STORE } from "./actionTypes"

export const addDive = content => ({
  type: ADD_DIVE,
  payload: {
    content
  }
});

export const selectDive = id => ({
  type: SELECT_DIVE,
  dive_id: id,
});

export const editDive = (id, content) => ({
  type: EDIT_DIVE,
  payload: {
    dive_id: id,
    content
  }
});

export const deleteDive = () => ({
  type: DELETE_DIVE,
});

export const initStore = content => ({
  type: INIT_STORE,
  payload: content,
});
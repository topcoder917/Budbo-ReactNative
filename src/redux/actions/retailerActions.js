// Action Types
export const SET_RETAILERS = 'SET_RETAILERS';

//Action Creator
export const setRetailers = (retailers) => ({
  type: SET_RETAILERS,
  payload: retailers,
});

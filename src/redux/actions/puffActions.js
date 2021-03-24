//Action Types
export const ADD_PUFF = 'ADD_PUFF';
export const REMOVE_PUFF = 'REMOVE_PUFF';
export const SET_DISCOVER = 'SET_DISCOVER';
export const SET_PUFF = 'SET_PUFF';

//Action Creator
export const addPuff = (productId) => ({
  type: ADD_PUFF,
  payload: {productId},
});

export const removePuff = (productId) => ({
  type: REMOVE_PUFF,
  payload: {productId},
});

export const setDiscover = (products) => ({
  type: SET_DISCOVER,
  payload: {products},
});

export const setPuff = (products) => ({
  type: SET_PUFF,
  payload: {products},
});

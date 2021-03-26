//Action Types
export const SET_ORDERS = 'SET_ORDERS';
export const SET_ADDED_CARD = 'SET_ADDED_CARD';

//Action Creator
export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const setAddedCard = (addedFlag) => ({
  type: SET_ADDED_CARD,
  payload: {addedFlag},
});

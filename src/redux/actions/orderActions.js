//Action Types
export const SET_ORDERS = 'SET_ORDERS';

//Action Creator
export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

import {SET_ORDERS} from '../actions/orderActions';

const initData = {
  orders: [],
};

const orderReducer = (state = initData, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      const orders = action.payload;
      return {
        ...state,
        orders: orders,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;

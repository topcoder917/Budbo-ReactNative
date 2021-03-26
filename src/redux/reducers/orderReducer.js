import {SET_ORDERS, SET_ADDED_CARD} from '../actions/orderActions';

const initData = {
  orders: [],
  addedFlag: false
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
    case SET_ADDED_CARD: {
      const {addedFlag} = action.payload;
      return {...state, addedFlag: addedFlag};
    }
    default:
      return state;
  }
};

export default orderReducer;

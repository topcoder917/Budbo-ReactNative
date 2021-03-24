import {SET_RETAILERS} from '../actions/retailerActions';

const initData = {
  retailers: [],
};

const retailerReducer = (state = initData, action) => {
  switch (action.type) {
    case SET_RETAILERS: {
      const retailers = action.payload;
      return {
        ...state,
        retailers,
      };
    }
    default:
      return state;
  }
};

export default retailerReducer;

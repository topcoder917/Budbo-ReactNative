import {REFRESH_HOME} from '../actions/homeActions';
import {SET_CURRENT_ADDRESS} from '../actions/homeActions';

const initData = {
  refreshCount: 0,
  currentAddress: '604 Brazos St',
};

const homeReducer = (state = initData, action) => {
  switch (action.type) {
    case REFRESH_HOME: {
      const {refreshCount} = action.payload;
      return {...state, refreshCount: refreshCount};
    }
    case SET_CURRENT_ADDRESS: {
      const {address} = action.payload;
      return {...state, currentAddress: address};
    }
    default:
      return state;
  }
};

export default homeReducer;

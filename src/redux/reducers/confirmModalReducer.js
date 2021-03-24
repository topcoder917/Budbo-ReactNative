import {
  SHOW_CONFIRM_MODAL
} from '../actions/confirmActions';

const initData = {
  confirmModalFlag: false
};

const confirmModalReducer = (state = initData, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_MODAL: {
      const {confirmModalFlag} = action.payload;
      return {...state, confirmModalFlag: confirmModalFlag};
    }
    default:
      return state;
  }
};

export default confirmModalReducer;

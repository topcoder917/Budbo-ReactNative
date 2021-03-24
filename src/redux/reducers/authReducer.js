import {SET_USER} from '../actions/authActions';

const initData = {
  user: {},
};

const authReducer = (state = initData, action) => {
  switch (action.type) {
    case SET_USER: {
      const {user} = action.payload;
      return {user};
    }
    default:
      return state;
  }
};

export default authReducer;

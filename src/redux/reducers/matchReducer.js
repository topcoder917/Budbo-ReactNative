import {SET_SHOW_MATCH} from '../actions/matchActions';

const initState = {
  isShowMatch: false,
};

const matchReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SHOW_MATCH: {
      const {isShowMatch} = action.payload;
      return {
        ...state,
        isShowMatch,
      };
    }
    default:
      return state;
  }
};

export default matchReducer;

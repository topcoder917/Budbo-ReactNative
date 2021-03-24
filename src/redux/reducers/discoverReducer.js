import {SET_FILTER} from '../actions/discoverActions';

const initData = {
  filter: [true, false, false, false, false],
};

const discoverReducer = (state = initData, action) => {
  switch (action.type) {
    case SET_FILTER: {
      const {filter} = action.payload;
      return {filter};
    }
    default:
      return state;
  }
};

export default discoverReducer;

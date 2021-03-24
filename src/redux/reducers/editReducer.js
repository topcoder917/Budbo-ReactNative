import {SAVE_DATA} from '../actions/editActions';

const initData = {
  title: '',
  updatedAt: '',
  personalInfo: {},
  summary: '',
  dragData: [
    {employHistory: []},
    {education: []},
    {websites: []},
    {
      skills: {
        isShown: false,
        data: [],
      },
    },
  ],
};

const editReducer = (state = {data: initData}, action) => {
  switch (action.type) {
    case SAVE_DATA:
      return {data: {...state.data, ...action.payload.data}};
    default:
      return state;
  }
};

export default editReducer;

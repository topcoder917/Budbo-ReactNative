//Action Types
export const SET_SHOW_MATCH = 'SET_SHOW_MATCH';

//Action Creator
export const setShowMatch = (isShow) => ({
  type: SET_SHOW_MATCH,
  payload: {isShowMatch: isShow},
});

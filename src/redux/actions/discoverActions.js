//Action Types
export const SET_FILTER = 'SET_FILTER';

//Action Creator
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: {filter},
});

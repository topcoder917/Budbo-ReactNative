//Action Types
export const SET_USER = 'SET_USER';

//Action Creator
export const setUser = (user) => ({
  type: SET_USER,
  payload: {user},
});

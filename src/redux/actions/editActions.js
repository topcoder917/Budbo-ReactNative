//Action Types
export const SAVE_DATA = 'SAVE_DATA';

//Action Creator
export const saveData = (data) => ({
  type: SAVE_DATA,
  payload: {data},
});

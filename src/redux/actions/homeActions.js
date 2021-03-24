//Action Types
export const REFRESH_HOME = 'REFRESH_HOME';
export const SET_CURRENT_ADDRESS = 'SET_CURRENT_ADDRESS';

//Action Creator
export const refreshHome = (refreshCount) => ({
  type: REFRESH_HOME,
  payload: {refreshCount},
});

export const setCurrentAddress = (address) => ({
  type: SET_CURRENT_ADDRESS,
  payload: {address},
});

//Action Types
export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL';


//Action Creator
export const showConfirmModal = (confirmModalFlag) => ({
  type: SHOW_CONFIRM_MODAL,
  payload: {confirmModalFlag},
});


import {put, takeLatest} from 'redux-saga/effects';

import * as cartActions from '../actions/cartActions';
import * as editActions from '../actions/editActions';

export function* saga() {
  // yield takeLatest(authActions.LOGIN, function* loginSaga() {
  //   yield put(authActions.requestUser());
  // });
  // yield takeLatest(authActions.REGISTER, function* registerSaga() {
  //   yield put(authActions.requestUser());
  // });
  // yield takeLatest(authActions.USER_REQUESTED, function* userRequested() {
  //   const {data: user} = yield authActions.getUserByToken();
  //   // app
  //   // .database()
  //   // .ref()
  //   // .child("data/" + user.uid)
  //   // .once("value")
  //   // .then(snapshot => {
  //   //   let resData = snapshot.val();
  //   //   let dragData = [];
  //   //   if (!resData.dragData) {
  //   //     resData.dragData = [];
  //   //   }
  //   //   resData.dragData.forEach(elem => dragData.push(elem));
  //   //   const keys = resData.dragData.map(elem => Object.keys(elem)[0]);
  //   //   if (keys.indexOf("employHistory") < 0) {
  //   //     dragData.push({ employHistory: [] });
  //   //   }
  //   //   if (keys.indexOf("education") < 0) {
  //   //     dragData.push({ education: [] });
  //   //   }
  //   //   if (keys.indexOf("websites") < 0) {
  //   //     dragData.push({ websites: [] });
  //   //   }
  //   //   if (keys.indexOf("skills") < 0) {
  //   //     dragData.push({ skills: { isShown: false, data: [] } });
  //   //   }
  //   //   resData.dragData = dragData.map(elem => elem);
  //   //   put(editActions.saveData(resData));
  //   // });
  //   yield put(authActions.fulfillUser(user));
  // });
}

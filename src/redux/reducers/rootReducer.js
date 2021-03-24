import {all} from 'redux-saga/effects';
import {saga} from './sagas';
// import editReducer from './editReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import homeReducer from './homeReducer';
import authReducer from './authReducer';
import puffReducer from './puffReducer';
import discoverReducer from './discoverReducer';
import retailerReducer from './retailerReducer';
import matchReducer from './matchReducer';

import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  // edit: editReducer,
  cart: cartReducer,
  order: orderReducer,
  home: homeReducer,
  puff: puffReducer,
  discover: discoverReducer,
  retailer: retailerReducer,
  match: matchReducer,
});

export function* rootSaga() {
  yield all([saga()]);
}

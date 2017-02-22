import { combineReducers } from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import locationReducer from './location'
import authReducer from './auth'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    auth: authReducer,
    location: locationReducer,
    toastr: toastrReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer

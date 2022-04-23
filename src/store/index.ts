import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactDetailsAPI } from '../api';

const rootReducer = combineReducers({
  [contactDetailsAPI.reducerPath]: contactDetailsAPI.reducer,
});

export default () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(contactDetailsAPI.middleware),
  });

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactDetailsAPI, relativeAPI, childrenAPI } from '../api';

const rootReducer = combineReducers({
  [contactDetailsAPI.reducerPath]: contactDetailsAPI.reducer,
  [relativeAPI.reducerPath]: relativeAPI.reducer,
  [childrenAPI.reducerPath]: childrenAPI.reducer,
});

export default () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(contactDetailsAPI.middleware, relativeAPI.middleware, childrenAPI.middleware),
  });

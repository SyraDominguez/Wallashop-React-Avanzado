import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adReducer from './adReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  ads: adReducer,
});

export default rootReducer;

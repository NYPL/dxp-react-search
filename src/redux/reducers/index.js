import { combineReducers } from 'redux';
import map from './map';
import search from './search';

const rootReducer = combineReducers({
  map,
  search,
});

export default rootReducer;

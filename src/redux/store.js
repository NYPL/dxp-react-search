import { createStore } from 'redux'
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const initializeStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(),
  );

  return store;
};

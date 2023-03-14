import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export type RootState = ReturnType<typeof rootReducer>;

/* @Info createStore from react-redux is marked as deprecated and they strongly recommend using configureStore instead.
See https://redux.js.org/style-guide/#priority-b-rules-strongly-recommended
@Info: as per deocumentation composeWithDevTools is already handeling that.
See https://redux-toolkit.js.org/api/configureStore#enhancers */

export const initializeStore = (initialState?: RootState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return store;
};

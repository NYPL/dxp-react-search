import App from "next/app";
import { Provider } from "react-redux";
import { initializeStore, RootState } from "./store";
// Type
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { NextComponentType } from "next";

let reduxStore: ToolkitStore;
const getOrInitializeStore = (initialState?: RootState) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === "undefined") {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};

export const withRedux = (
  PageComponent: NextComponentType | typeof App,
  { ssr = true } = {}
) => {
  const WithRedux = ({ initialReduxState, ...props }: any) => {
    const store = getOrInitializeStore(initialReduxState);
    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== "production") {
    const isAppHoc =
      PageComponent === App || PageComponent.prototype instanceof App;
    if (isAppHoc) {
      throw new Error("The withRedux HOC only works with PageComponents");
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.name || "Component";

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async (context: any) => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrInitializeStore();

      // Provide the store to getInitialProps of pages
      context.reduxStore = reduxStore;

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === "function"
          ? await PageComponent.getInitialProps(context)
          : {};

      // Pass props to PageComponent
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState(),
      };
    };
  }

  return WithRedux;
};

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

function TestProvider({ children }) {
  // Mock redux
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  return (
    <Provider store={store}>{children}</Provider>
  );
}

export default TestProvider;

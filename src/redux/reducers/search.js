import { SET_TEST, SET_SEARCH_GEO } from './../actions';

const initialState = {
  test: 'we have the test.',
};

export default function search(state = initialState, action) {
  switch(action.type) {
    case SET_TEST:
      return {
        ...state,
        test: action.payload
      };

    case SET_SEARCH_GEO:
      console.log('SET_SEARCH_GEO action payload: ' + action.payload);
      return {
        ...state,
        searchGeo: action.payload
      };

    default:
      return {
        ...state
      }
  }
}

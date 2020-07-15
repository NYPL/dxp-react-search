import { SET_TEST, SET_SEARCH_QUERY, SET_SEARCH_QUERY_GEO } from './../actions';

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

    case SET_SEARCH_QUERY:
      console.log('SET_SEARCH_QUERY action payload: ' + action.payload);
      return {
        ...state,
        searchQuery: action.payload
      };

    case SET_SEARCH_QUERY_GEO:
      console.log('SET_SEARCH_QUERY_GEO action payload: ' + action.payload);
      return {
        ...state,
        searchQueryGeoLat: action.payload.lat,
        searchQueryGeoLng: action.payload.lng
      };

    default:
      return {
        ...state
      }
  }
}

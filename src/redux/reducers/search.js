import { SET_SEARCH_QUERY } from './../actions';

const initialState = {};

export default function search(state = initialState, action) {
  switch(action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query,
        searchQueryGeoLat: action.payload.lat,
        searchQueryGeoLng: action.payload.lng
      };

    default:
      return {
        ...state
      }
  }
}

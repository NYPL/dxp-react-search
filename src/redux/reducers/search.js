import { SET_SEARCH_QUERY, SET_AUTO_SUGGEST_INPUT_VALUE } from './../actions';

const initialState = {
  autoSuggestInputValue: '',
};

export default function search(state = initialState, action) {
  switch(action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query,
        searchQueryGeoLat: action.payload.lat,
        searchQueryGeoLng: action.payload.lng
      };

    case SET_AUTO_SUGGEST_INPUT_VALUE:
      return {
        ...state,
        autoSuggestInputValue: action.payload
      };

    default:
      return {
        ...state
      }
  }
}

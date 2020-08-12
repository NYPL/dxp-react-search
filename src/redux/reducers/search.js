import {
  SET_SEARCH_QUERY,
  SET_AUTO_SUGGEST_INPUT_VALUE,
  SET_OPEN_NOW,
  SET_SEARCH_RESULTS_COUNT
} from './../actions';

const initialState = {
  autoSuggestInputValue: '',
  openNow: false,
  resultsCount: ''
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

    case SET_OPEN_NOW:
      return {
        ...state,
        openNow: action.payload
      };

    case SET_SEARCH_RESULTS_COUNT:
      return {
        ...state,
        // @TODO Why do we have to do this?
        resultsCount: action.payload.resultsCount
      };

    default:
      return {
        ...state
      }
  }
}

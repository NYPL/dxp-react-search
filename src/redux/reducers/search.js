import {
  SET_SEARCH_QUERY,
  SET_AUTO_SUGGEST_INPUT_VALUE,
  SET_OPEN_NOW,
  SET_PAGINATION,
  RESET_SEARCH
} from './../actions';

const initialState = {
  autoSuggestInputValue: '',
  openNow: false,
  resultsCount: '',
  offset: 0,
  pageCount: 0,
  pageNumber: 1
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
        openNow: action.payload.openNow,
        searchQuery: action.payload.searchQuery,
        //resultsCount: action.payload.resultsCount
      };

    case SET_PAGINATION:
      return {
        ...state,
        offset: action.payload.offset,
        pageCount: action.payload.pageCount,
        pageNumber: action.payload.pageNumber,
        resultsCount: action.payload.resultsCount
      };

    case RESET_SEARCH:
      return {
        ...state,
        searchQuery: '',
        searchQueryGeoLat: '',
        searchQueryGeoLng: '',
        autoSuggestInputValue: '',
        offset: 0,
        pageCount: 0,
        pageNumber: 1,
        resultsCount: '',
        openNow: false
      };

    default:
      return {
        ...state
      }
  }
}

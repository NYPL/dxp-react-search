import {
  SET_SEARCH_QUERY,
  SET_AUTO_SUGGEST_INPUT_VALUE,
  SET_OPEN_NOW,
  SET_PAGINATION,
  RESET_SEARCH,
  SET_FILTERS,
  SET_DROPDOWN_CHECKED
} from './../actions';

const initialState = {
  autoSuggestInputValue: '',
  openNow: false,
  resultsCount: '',
  offset: 0,
  pageCount: 0,
  pageNumber: 1,
  searchFilters: [],
  dropdownId: false
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
        offset: 0,
        pageCount: 0,
        pageNumber: 1
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
        openNow: false,
        searchFilters: []
      };
    
    case SET_FILTERS:
      // Logic for checking if we should add or remove a tid from the state.
      /*let termIdExists = state.searchFilters.indexOf(action.payload.searchFilters) > -1;
      // Make a copy of the existing array
      let termIds = state.searchFilters.slice();
      if (termIdExists) {
        termIds = termIds.filter(id => id != action.payload.searchFilters);                
      } else {
        // Modify the copy, not the original
        termIds.push(action.payload.searchFilters);            
      }
      */

      return {
        ...state,
        //searchFilters: termIds
        searchFilters: action.payload.searchFilters,
        dropdownId: false
      }
    
    case SET_DROPDOWN_CHECKED:
      return {
        ...state,
        dropdownId: action.payload.dropdownId
      }

    default:
      return {
        ...state
      }
  }
}

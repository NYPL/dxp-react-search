import {
  SET_SEARCH_QUERY,
  SET_AUTO_SUGGEST_INPUT_VALUE,
  SET_OPEN_NOW,
  SET_PAGINATION,
  RESET_SEARCH,
  SET_FILTERS,
  DELETE_FILTER,
  SET_SELECTED_ITEMS
} from './../actions';

const initialState = {
  autoSuggestInputValue: '',
  openNow: false,
  resultsCount: '',
  offset: 0,
  pageCount: 0,
  pageNumber: 1,
  searchFilters: []
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
        pageNumber: initialState.pageNumber
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
        pageNumber: initialState.pageNumber,
        resultsCount: '',
        openNow: false,
        searchFilters: []
      };
    
    case SET_FILTERS:
      return {
        ...state,
        searchFilters: action.payload.searchFilters,
      }
    
    case DELETE_FILTER:
      const vocabId = action.payload.searchFilters;
      const nextSearchFiltersState = (object, property) => {
        let {[property]: omit, ...rest} = object
        return rest;
      }

      return {
        ...state,
        searchFilters: nextSearchFiltersState(state.searchFilters, vocabId),
      }
    
    case SET_SELECTED_ITEMS:
      const itemId = action.payload.selectedItemId;
      const groupId = action.payload.groupId;

      const nextState = (object, property) => {
        let {[property]: omit, ...rest} = object
        return rest;
      }
  
      let itemIds;
      // Check if the tid already exists in the state
      if (state.selectedItems[groupId] !== undefined) {
        let itemIdExists = state.selectedItems[groupId].items.indexOf(itemId) > -1;
        // Make a copy of the existing array.
        itemIds = state.selectedItems[groupId].items.slice();
        // If termId exists, remove it from the array.
        if (itemIdExists) {
          itemIds = itemIds.filter((id) => id != itemId);
        } else {
          // Add it to the array, but modify the copy, not the original.
          itemIds.push(itemId);
        }
      } else {
        itemIds = [];
        itemIds.push(itemId);
      }

      return {
        ...state,
        [groupId]: {
          items: itemIds
        }
      }

    default:
      return {
        ...state
      }
  }
}

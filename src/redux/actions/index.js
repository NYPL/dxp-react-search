export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_MAP_POSITION = 'SET_MAP_POSITION';
export const SET_MAP_INFO_WINDOW = 'SET_MAP_INFO_WINDOW';
export const RESET_MAP = 'RESET_MAP';
export const SET_AUTO_SUGGEST_INPUT_VALUE = 'SET_AUTO_SUGGEST_INPUT_VALUE';
export const SET_OPEN_NOW = 'SET_OPEN_NOW';
export const SET_PAGINATION = 'SET_PAGINATION';
export const RESET_SEARCH = 'RESET_SEARCH';

export function setSearchQuery(payload) {
  return {
    type: SET_SEARCH_QUERY,
    payload: payload
  };
}

export function setMapPosition(payload) {
  return {
    type: SET_MAP_POSITION,
    payload: payload
  };
}

export function setMapInfoWindow(payload) {
  return {
    type: SET_MAP_INFO_WINDOW,
    payload: payload
  };
}

export function resetMap(payload) {
  return {
    type: RESET_MAP,
    payload: payload
  };
}

export function setAutoSuggestInputValue(payload) {
  return {
    type: SET_AUTO_SUGGEST_INPUT_VALUE,
    payload: payload
  };
}

export function setOpenNow(payload) {
  return {
    type: SET_OPEN_NOW,
    payload: payload
  };
}

export function setPagination(payload) {
  return {
    type: SET_PAGINATION,
    payload: payload
  };
}

export function resetSearch(payload) {
  return {
    type: RESET_SEARCH,
    payload: payload
  };
}

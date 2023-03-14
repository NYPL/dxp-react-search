export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_MAP_POSITION = "SET_MAP_POSITION";
export const SET_MAP_INFO_WINDOW = "SET_MAP_INFO_WINDOW";
export const RESET_MAP = "RESET_MAP";
export const SET_AUTO_SUGGEST_INPUT_VALUE = "SET_AUTO_SUGGEST_INPUT_VALUE";
export const SET_OPEN_NOW = "SET_OPEN_NOW";
export const SET_PAGINATION = "SET_PAGINATION";
export const RESET_SEARCH = "RESET_SEARCH";
export const SET_FILTERS = "SET_FILTERS";
export const DELETE_FILTER = "DELETE_FILTER";

export enum SearchActionType {
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_AUTO_SUGGEST_INPUT_VALUE = "SET_AUTO_SUGGEST_INPUT_VALUE",
  SET_OPEN_NOW = "SET_OPEN_NOW",
  SET_PAGINATION = "SET_PAGINATION",
  RESET_SEARCH = "RESET_SEARCH",
  SET_FILTERS = "SET_FILTERS",
  DELETE_FILTER = "DELETE_FILTER",
}

export enum MapActionType {
  SET_MAP_POSITION = "SET_MAP_POSITION",
  SET_MAP_INFO_WINDOW = "SET_MAP_INFO_WINDOW",
  RESET_MAP = "RESET_MAP",
}
type PayloadType = Record<string, any>;

export function setSearchQuery(payload: PayloadType) {
  return {
    type: SET_SEARCH_QUERY,
    payload: payload,
  };
}

export function setMapPosition(payload: PayloadType) {
  return {
    type: SET_MAP_POSITION,
    payload: payload,
  };
}

export function setMapInfoWindow(payload: PayloadType) {
  return {
    type: SET_MAP_INFO_WINDOW,
    payload: payload,
  };
}

export function resetMap(payload: PayloadType) {
  return {
    type: RESET_MAP,
    payload: payload,
  };
}

export function setAutoSuggestInputValue(payload: PayloadType) {
  return {
    type: SET_AUTO_SUGGEST_INPUT_VALUE,
    payload: payload,
  };
}

export function setOpenNow(payload: PayloadType) {
  return {
    type: SET_OPEN_NOW,
    payload: payload,
  };
}

export function setPagination(payload: PayloadType) {
  return {
    type: SET_PAGINATION,
    payload: payload,
  };
}

export function resetSearch() {
  return {
    type: RESET_SEARCH,
  };
}

export function setFilters(payload: PayloadType) {
  return {
    type: SET_FILTERS,
    payload: payload,
  };
}

export function deleteFilter(payload: PayloadType) {
  return {
    type: DELETE_FILTER,
    payload: payload,
  };
}

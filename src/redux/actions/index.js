export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_MAP_POSITION = 'SET_MAP_POSITION';
export const SET_LOCATION_INFO_WINDOW_ID = 'SET_LOCATION_INFO_WINDOW_ID';
export const SET_AUTO_SUGGEST_INPUT_VALUE = 'SET_AUTO_SUGGEST_INPUT_VALUE';

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

export function setLocationInfoWindowId(payload) {
  return {
    type: SET_LOCATION_INFO_WINDOW_ID,
    payload: payload
  };
}

export function setAutoSuggestInputValue(payload) {
  return {
    type: SET_AUTO_SUGGEST_INPUT_VALUE,
    payload: payload
  };
}

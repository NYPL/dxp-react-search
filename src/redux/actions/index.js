export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_SEARCH_QUERY_GEO = 'SET_SEARCH_QUERY_GEO';
export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';

export function setSearchQuery(payload) {
  return {
    type: SET_SEARCH_QUERY,
    payload: payload
  };
}

export function setSearchQueryGeo(payload) {
  return {
    type: SET_SEARCH_QUERY_GEO,
    payload: payload
  };
}

export function setMapCenter(payload) {
  return {
    type: SET_MAP_CENTER,
    payload: payload
  };
}

export function setMapZoom(payload) {
  return {
    type: SET_MAP_ZOOM,
    payload: payload
  };
}

export const SET_TEST = 'SET_TEST';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_SEARCH_QUERY_GEO = 'SET_SEARCH_QUERY_GEO';

export function setTest(payload) {
  return {
    type: SET_TEST,
    payload: payload
  };
}

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

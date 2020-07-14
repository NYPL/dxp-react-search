export const SET_TEST = 'SET_TEST';
export const SET_SEARCH_GEO = 'SET_SEARCH_GEO';

export function setTest(payload) {
  return {
    type: SET_TEST,
    payload: payload
  };
}

export function setSearchGeo(payload) {
  return {
    type: SET_SEARCH_GEO,
    payload: payload
  };
}

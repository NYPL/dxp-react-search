import { SET_MAP_CENTER, SET_MAP_ZOOM } from './../actions';

const initialState = {
  mapCenter: {
    lat: 40.7632,
    lng: -73.9822
  },
  mapZoom: 12
};

export default function search(state = initialState, action) {
  switch(action.type) {
    case SET_MAP_CENTER:
      return {
        ...state,
        mapCenter: action.payload
      };

    case SET_MAP_ZOOM:
      return {
        ...state,
        mapZoom: action.payload
      };

    default:
      return {
        ...state
      }
  }
}

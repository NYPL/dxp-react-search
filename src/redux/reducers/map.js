import { SET_MAP_POSITION, SET_LOCATION_INFO_WINDOW_ID } from './../actions';

const initialState = {
  mapCenter: {
    lat: 40.7632,
    lng: -73.9822
  },
  mapZoom: 12,
  locationInfoWindowId: false
};

export default function search(state = initialState, action) {
  switch(action.type) {
    case SET_MAP_POSITION:
      return {
        ...state,
        mapCenter: action.payload.mapCenter,
        mapZoom: action.payload.mapZoom
      };

    case SET_LOCATION_INFO_WINDOW_ID:
      return {
        ...state,
        locationInfoWindowId: action.payload
      };

    default:
      return {
        ...state
      }
  }
}

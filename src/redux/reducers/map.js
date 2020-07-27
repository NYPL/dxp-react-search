import { SET_MAP_CENTER } from './../actions';

const initialState = {
  mapCenter: {
    lat: 40.7532,
    lng: -73.9822
  }
};

export default function search(state = initialState, action) {
  switch(action.type) {
    case SET_MAP_CENTER:
      return {
        ...state,
        mapCenter: action.payload
      };

    default:
      return {
        ...state
      }
  }
}

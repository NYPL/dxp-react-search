import {
  SET_MAP_POSITION,
  SET_MAP_INFO_WINDOW,
  RESET_MAP,
  MapActionType,
} from "../actions";

const initialState = {
  mapCenter: {
    lat: 40.7632,
    lng: -73.9822,
  },
  mapZoom: 12,
  infoWindowId: false,
  infoWindowIsVisible: false,
};

type ActionType = {
  type: MapActionType;
  payload: any;
};

export default function search(state = initialState, action: ActionType) {
  switch (action.type) {
    case SET_MAP_POSITION:
      return {
        ...state,
        mapCenter: action.payload.mapCenter,
        mapZoom: action.payload.mapZoom,
      };

    case SET_MAP_INFO_WINDOW:
      return {
        ...state,
        infoWindowId: action.payload.infoWindowId,
        infoWindowIsVisible: action.payload.infoWindowIsVisible,
      };

    case RESET_MAP:
      return {
        ...state,
        mapCenter: action.payload.mapCenter,
        mapZoom: action.payload.mapZoom,
        infoWindowId: action.payload.infoWindowId,
        infoWindowIsVisible: action.payload.infoWindowIsVisible,
      };

    default:
      return {
        ...state,
      };
  }
}

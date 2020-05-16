import {
  AppState,
  StoreAction,
  StoreActionTypes,
  GLOBAL_CARD_LABEL
} from "./../interfaces/meta";
import * as mapboxgl from "mapbox-gl";
import { Glob } from "glob";

const initialState: AppState = {
  selectedEntity: {
    name: GLOBAL_CARD_LABEL,
    data: null,
    historicData: {
      cases: {},
      deaths: {},
      recovered: {}
    }
  },
  mapCenter: new mapboxgl.LngLat(95.7129, 37.0902), // defaults to US
  allData: [],
  globalData: null,
  historicDataLoading: true
};
const reducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case StoreActionTypes.SetAllData: {
      return {
        ...state,
        allData: action.payload
      };
    }
    case StoreActionTypes.SetSelectedEntity:
      return {
        ...state,
        selectedEntity: {
          name: action.payload.name || "Global Data",
          data: action.payload.data,
          historicData: action.payload.historicData
        }
      };
    case StoreActionTypes.SetGlobalData:
      return {
        ...state,
        globalData: action.payload
      };
    case StoreActionTypes.SetHistoricDataLoading:
      return {
        ...state,
        historicDataLoading: action.payload
      };

    case StoreActionTypes.SetMapCenter:
      return {
        ...state,
        mapCenter: new mapboxgl.LngLat(action.payload.lng, action.payload.lat)
      };
    case StoreActionTypes.SetSelectedLabel:
      return {
        ...state,
        selectedEntity: { ...state.selectedEntity, name: action.payload }
      };
  }
  return state;
};

export default reducer;

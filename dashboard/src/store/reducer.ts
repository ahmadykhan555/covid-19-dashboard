import {
  AppState,
  StoreAction,
  StoreActionTypes,
  GLOBAL_CARD_LABEL
} from "./../interfaces/meta";
import * as mapboxgl from "mapbox-gl";
import { Glob } from "glob";

const initialState: AppState = {
  mapCenter: new mapboxgl.LngLat(-97, 38), // defaults to US
  allData: [],
  globalData: null,
  historicDataLoading: true,
  graphViewExpanded: false,
  selectedEntity: {
    name: GLOBAL_CARD_LABEL,
    data: null,
    historicData: {
      cases: {},
      deaths: {},
      recovered: {},
      json: {}
    }
  },
  isMobileView: window.innerWidth < 600 ? true : false,
  showModal: false,
  menuExpanded: false
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

    case StoreActionTypes.SetGraphViewExpanded:
      return {
        ...state,
        graphViewExpanded: action.payload
      };
    case StoreActionTypes.SetMobileView:
      return {
        ...state,
        isMobileView: action.payload
      };
    case StoreActionTypes.SetShowModal:
      return {
        ...state,
        showModal: action.payload
      };
    case StoreActionTypes.SetMenuExpanded:
      return {
        ...state,
        menuExpanded: action.payload
      };
  }
  return state;
};

export default reducer;

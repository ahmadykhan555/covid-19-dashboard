import { AppState, StoreAction, StoreActionTypes } from "./../interfaces/meta";
import * as mapboxgl from "mapbox-gl";

const initialState: AppState = {
  selectedEntity: {
    name: "",
    data: null
  },
  historicData: {
    cases: {},
    deaths: {},
    recovered: {}
  },
  mapCenter: new mapboxgl.LngLat(95.7129, 37.0902), // defaults to US
  allData: [],
  globalData: null
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
          data: action.payload
        }
      };
    case StoreActionTypes.SetGlobalData:
      return {
        ...state,
        globalData: action.payload
      };
  }
  return state;
};

export default reducer;

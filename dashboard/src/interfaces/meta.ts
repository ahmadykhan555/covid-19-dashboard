export interface AppState {
  selectedEntity: SelectedEntity;
  mapCenter: mapboxgl.LngLat;
  allData: CovidData[];
  globalData: GlobalData | null;
  historicDataLoading: boolean;
}

export interface StoreAction {
  type: StoreActionTypes;
  payload: any;
}

export enum StoreActionTypes {
  SetAllData = "SET_ALL_DATA",
  SetSelectedEntity = "SET_SELECTED",
  SetGlobalData = "SET_GLOBAL_DATA",
  SetHistoricData = "SET_HISTORIC",
  SetHistoricDataLoading = "HIS_DATA_LOADING"
}

export interface GlobalData {
  active: number;
  affectedCountries: number;
  cases: number;
  casesPerOneMillion: number;
  critical: number;
  deaths: number;
  deathsPerOneMillion: number;
  recovered: number;
  tests: number;
  testsPerOneMillion: number;
  todayCases: number;
  todayDeaths: number;
  updated: number;
}

export interface CovidData {
  active: number;
  cases: number;
  casesPerOneMillion: number;
  continent: string;
  country: string;
  countryInfo: CountryInfo;
  critical: number;
  deaths: number;
  deathsPerOneMillion: number;
  recovered: number;
  tests: number;
  testsPerOneMillion: number;
  todayCases: number;
  todayDeaths: number;
  updated: number;
}

export interface CountryInfo {
  flag: string;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
}

export interface HistoricData {
  cases: object;
  deaths: object;
  recovered: object;
}

export interface SelectedEntity {
  name: string;
  data: CovidData | null;
  historicData: HistoricData;
}

import React, { useEffect, useState } from "react";
import {
  getAllCountriesData,
  getGlobalStats,
  getHistoricDataForCountry,
  getGlobalHistoricData
} from "../../shared/covid-data-api/api";
import "./AllCountriesStatsComponent.scss";
import * as mapboxgl from "mapbox-gl";
import {
  CovidData,
  AppState,
  SelectedEntity,
  StoreActionTypes,
  GlobalData,
  HistoricData
} from "../../interfaces/meta";
import { connect, ConnectedProps } from "react-redux";
import StatsCardComponent from "../StatsCard/StatsCardComponent";

interface GlobalStatsProps extends PropsFromRedux {}
const POLL_INTERVAL: number = 60 * 1000 * 3;
const GLOBAL_CARD_INDEX = 99999;

// component def
const AllCountriesStatsComponent: React.FC<GlobalStatsProps> = ({
  setAllData,
  allData,
  setGlobalData,
  globalData,
  setSelectedEntity,
  setHistoricCluster,
  setHistoricDataLoading
}) => {
  // loccal state
  let [pollCount, setpollCount] = useState<number>(0);
  useEffect(() => {
    refreshData();
  }, [pollCount]);
  useEffect(() => {
    initPolling();
  }, []);

  const refreshData = () => {
    loadGlobalData();
    getAllCountriesData().then((data: any) => {
      setAllData(data);
    });
  };

  const loadGlobalData = async () => {
    const globalStatsResponse = await getGlobalStats();
    setHistoricDataLoading(true);
    const globalHistoricData: any = await getGlobalHistoricData();
    setHistoricDataLoading(false);
    setGlobalData(globalStatsResponse.data);
    setSelectedEntity({
      name: "Global Data",
      data: globalStatsResponse.data,
      historicData: globalHistoricData
    });
    getGlobalHistoricData().then((res: any) => setHistoricCluster(res));
  };

  const initPolling = () => {
    setInterval(() => {
      setpollCount(++pollCount);
    }, POLL_INTERVAL);
  };

  const handleCardClick = async (index: number) => {
    const selectedCountryData = allData[index];
    setHistoricDataLoading(true);
    const historicData: any = await getHistoricDataForCountry(
      selectedCountryData.country
    );
    setHistoricDataLoading(false);
    setSelectedEntity({
      name: selectedCountryData.country,
      data: selectedCountryData,
      historicData: historicData
    });
  };

  const renderCountryStatsCard = (country: CovidData, index: number) => {
    return (
      <StatsCardComponent
        label={country.country}
        imgSrc={country.countryInfo.flag}
        casesCount={country.cases}
        deathsCount={country.deaths}
        recoveredCount={country.recovered}
        perMillionCount={country.casesPerOneMillion}
        index={index}
        onClick={handleCardClick}
      />
    );
  };

  const renderGlobalStatsCard = () => {
    if (globalData) {
      return (
        <StatsCardComponent
          label={"global data"}
          imgSrc=""
          casesCount={globalData.cases}
          deathsCount={globalData.deaths}
          recoveredCount={globalData.recovered}
          perMillionCount={globalData.casesPerOneMillion}
          selected={true}
          index={GLOBAL_CARD_INDEX}
          onClick={handleCardClick}
        />
      );
    }
  };

  return (
    <div className="global-stats-component">
      {globalData && renderGlobalStatsCard()}
      {allData.map((country: CovidData, index: number) =>
        renderCountryStatsCard(country, index)
      )}
    </div>
  );
};

// connect to store
const mapStateToProps = (state: AppState) => {
  return {
    allData: state.allData,
    selectedEntity: state.selectedEntity,
    globalData: state.globalData
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setAllData: (payload: CovidData[]) =>
      dispatch({ type: StoreActionTypes.SetAllData, payload }),
    setSelectedEntity: (payload: SelectedEntity) =>
      dispatch({ type: StoreActionTypes.SetSelectedEntity, payload }),
    setGlobalData: (payload: GlobalData) =>
      dispatch({ type: StoreActionTypes.SetGlobalData, payload }),
    setHistoricCluster: (payload: HistoricData) =>
      dispatch({ type: StoreActionTypes.SetHistoricData, payload }),
    setHistoricDataLoading: (payload: boolean) =>
      dispatch({ type: StoreActionTypes.SetHistoricDataLoading, payload })
  };
};
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(AllCountriesStatsComponent);

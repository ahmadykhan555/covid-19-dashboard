import React, { useEffect, useState } from "react";
import {
  getAllCountriesData,
  getGlobalStats,
  getHistoricDataForCountry,
  getGlobalHistoricData
} from "../../shared/covid-data-api/api";
import "./AllCountriesStatsComponent.scss";
import globeAvatar from "../../img/globel.png";
import * as mapboxgl from "mapbox-gl";
import {
  CovidData,
  AppState,
  SelectedEntity,
  StoreActionTypes,
  GlobalData,
  HistoricData,
  GLOBAL_CARD_LABEL
} from "../../interfaces/meta";
import { connect, ConnectedProps } from "react-redux";
import StatsCardComponent from "../StatsCard/StatsCardComponent";

interface GlobalStatsProps extends PropsFromRedux {}
const POLL_INTERVAL: number = 60 * 1000 * 5;
const GLOBAL_CARD_INDEX = 99999;

// component def
const AllCountriesStatsComponent: React.FC<GlobalStatsProps> = ({
  setAllData,
  allData,
  setGlobalData,
  globalData,
  setSelectedEntity,
  setHistoricDataLoading,
  selectedEntity,
  setMapCenter,
  setSelectedLabel,
  setShowModal
}) => {
  // loccal state
  let [pollCount, setpollCount] = useState<number>(0);
  const [globalHistoricData, setGlobalHistoricData] = useState<HistoricData>({
    cases: {},
    deaths: {},
    recovered: {}
  });
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
    if (selectedEntity.name === GLOBAL_CARD_LABEL) {
      setHistoricDataLoading(true);
      const globalHistoricData: any = await getGlobalHistoricData();
      setHistoricDataLoading(false);
      setGlobalHistoricData(globalHistoricData);
      setSelectedEntity({
        name: GLOBAL_CARD_LABEL,
        data: globalStatsResponse.data,
        historicData: globalHistoricData
      });
      setGlobalData(globalStatsResponse.data);
    }
  };

  const initPolling = () => {
    setInterval(() => {
      setpollCount(++pollCount);
    }, POLL_INTERVAL);
  };

  const handleCardClick = async (index: number) => {
    if (index === GLOBAL_CARD_INDEX) {
      setSelectedEntity({
        name: GLOBAL_CARD_LABEL,
        data: globalData as any,
        historicData: globalHistoricData
      });
      setMapCenter(new mapboxgl.LngLat(95.7129, 37.0902)); // defaults to US)
    } else {
      if (allData[index] && allData[index].country) {
        setSelectedLabel(allData[index].country || "");
        if (allData[index].countryInfo) {
          setMapCenter(
            new mapboxgl.LngLat(
              (allData[index].countryInfo as any).long,
              (allData[index].countryInfo as any).lat
            )
          );
        }
        setHistoricDataLoading(true);
        const historicData: any = await getHistoricDataForCountry(
          allData[index].country
        );
        setHistoricDataLoading(false);
        setSelectedEntity({
          name: allData[index].country || "USA",
          data: allData[index],
          historicData: historicData
        });
      }
    }
    setShowModal(true);
  };

  const renderCountryStatsCard = (country: CovidData, index: number) => {
    if (country.countryInfo) {
      return (
        <StatsCardComponent
          label={country.country || ""}
          imgSrc={country.countryInfo.flag || ""}
          casesCount={country.cases}
          deathsCount={country.deaths}
          recoveredCount={country.recovered}
          perMillionCount={country.casesPerOneMillion}
          index={index}
          onClick={handleCardClick}
          selected={
            selectedEntity ? selectedEntity.name === country.country : false
          }
        />
      );
    } else {
      return "";
    }
  };

  const renderGlobalStatsCard = () => {
    if (globalData) {
      return (
        <StatsCardComponent
          label={GLOBAL_CARD_LABEL}
          imgSrc={globeAvatar}
          casesCount={globalData.cases}
          deathsCount={globalData.deaths}
          recoveredCount={globalData.recovered}
          perMillionCount={globalData.casesPerOneMillion}
          index={GLOBAL_CARD_INDEX}
          onClick={handleCardClick}
          selected={
            selectedEntity ? selectedEntity.name === GLOBAL_CARD_LABEL : false
          }
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
    setHistoricDataLoading: (payload: boolean) =>
      dispatch({ type: StoreActionTypes.SetHistoricDataLoading, payload }),
    setMapCenter: (payload: mapboxgl.LngLat) =>
      dispatch({ type: StoreActionTypes.SetMapCenter, payload }),
    setSelectedLabel: (payload: string) =>
      dispatch({ type: StoreActionTypes.SetSelectedLabel, payload }),
    setShowModal: (expanded: boolean) =>
      dispatch({
        type: StoreActionTypes.SetShowModal,
        payload: expanded
      })
  };
};
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(AllCountriesStatsComponent);

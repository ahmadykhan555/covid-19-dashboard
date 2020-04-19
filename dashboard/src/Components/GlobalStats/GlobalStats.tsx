import React, { useEffect, useState } from "react";
import { getAllCountriesData } from "../../shared/covid-data-api/api";
import "./GlobalStats.scss";
import * as mapboxgl from "mapbox-gl";
import ReactTooltip from "react-tooltip";
import { convertToThousand } from "../../shared/data-utility/utility";

interface GlobalStatsProps {
  mapCenterSetter: any;
  lastUpdatedSetter: any;
  selectedCountrySetter: any;
}

const POLL_INTERVAL: number = 60 * 1000 * 3;
const GlobalStatsComponent: React.FC<GlobalStatsProps> = ({
  mapCenterSetter,
  lastUpdatedSetter,
  selectedCountrySetter
}) => {
  const [covidData, setCovidData] = useState<any[]>([]);
  let [pollCount, setpollCount] = useState<number>(0);
  useEffect(() => {
    refreshData();
    lastUpdatedSetter(covidData.length ? covidData[0].updated : new Date());
  }, [pollCount]);
  useEffect(() => {
    initPolling();
  }, []);

  const refreshData = () => {
    getAllCountriesData().then((data: any) => {
      setCovidData(data);
    });
  };

  const initPolling = () => {
    setInterval(() => {
      setpollCount(++pollCount);
    }, POLL_INTERVAL);
  };

  const didTapCountry = (country: any) => {
    mapCenterSetter(
      new mapboxgl.LngLat(country.countryInfo.long, country.countryInfo.lat)
    );
    selectedCountrySetter(country);
  };

  const countryStatsListItem = (country: any, index: number) => {
    return (
      <div
        className="country-stats-li card-item"
        key={index}
        onClick={() => didTapCountry(country)}
        data-for={`tooltip-${index}`}
        data-tip={`Fly to ${country.country}`}
      >
        <div className="flag-container">
          <img src={country.countryInfo.flag} alt="" />
        </div>
        <div className="stats stats-detail">
          <div className="stats__infections">
            <label>Cases</label>
            <h4>{convertToThousand(country.cases)}</h4>
          </div>
          <div className="stats__deaths">
            <label>Deaths</label>
            <h4>{convertToThousand(country.deaths)}</h4>
          </div>
          <div className="stats__critical">
            <label>Critical</label>
            <h4>{convertToThousand(country.critical)}</h4>
          </div>
          <div className="stats__recovered">
            <label>Recovered</label>
            <h4>{convertToThousand(country.recovered)}</h4>
          </div>
        </div>
        <ReactTooltip id={`tooltip-${index}`} />
      </div>
    );
  };
  return (
    <div className="global-stats-component">
      {covidData.map((country: any, index: number) =>
        countryStatsListItem(country, index)
      )}
    </div>
  );
};

export default GlobalStatsComponent;

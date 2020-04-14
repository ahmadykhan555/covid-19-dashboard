import React, { useEffect, useState } from "react";
import { getAllCountriesData } from "../../shared/covid-data-api/api";
import "./GlobalStats.scss";
import * as mapboxgl from "mapbox-gl";
import ReactTooltip from "react-tooltip";

interface GlobalStatsProps {
  mapCenterSetter: any;
}

const GlobalStatsComponent: React.FC<GlobalStatsProps> = ({
  mapCenterSetter
}) => {
  const [covidData, setCovidData] = useState<any[]>([]);
  useEffect(() => {
    getAllCountriesData().then(res => {
      if (res.data) {
        setCovidData(sortByCases(res.data));
      }
    });
  }, []);

  const sortByCases = (data: any[]) => {
    const sortedData = data.sort((a, b) => b.cases - a.cases);
    return sortedData;
  };

  const convertToThousand = (stringifiedNumber: string) => {
    return (Number(stringifiedNumber) / 1000).toFixed(2) + "K";
  };

  const didTapCountry = (info: any) => {
    mapCenterSetter(new mapboxgl.LngLat(info.long, info.lat));
  };

  const countryStatsListItem = (country: any, index: number) => {
    return (
      <div
        className="country-stats-li"
        key={index}
        onClick={() => didTapCountry(country.countryInfo)}
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

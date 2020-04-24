import axios from "axios";
import moment from "moment";
const BASEURL = "https://corona.lmao.ninja/v2/";
const ENDPOINTS = {
  AllCountries: "countries",
  SelectedCountry: "countries",
  AllStates: "states",
  GlobalStats: "all",
  HistoricGlobal: "historical/all?lastdays=90"
};

export const getAllCountriesData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}${ENDPOINTS.AllCountries}`)
      .then((res: any) => {
        resolve(sortByCases(res.data));
      })
      .catch(err => reject(err));
  });
};

export const getAllStatesData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}${ENDPOINTS.AllStates}`)
      .then((res: any) => {
        resolve(sortByCases(res.data));
      })
      .catch(err => reject(err));
  });
};

export const getDataForCountry = (country: string) => {
  return axios.get(`${BASEURL}${ENDPOINTS.SelectedCountry}/${country}`);
};

export const getGlobalStats = () => {
  return axios.get(`${BASEURL}${ENDPOINTS.GlobalStats}`);
};

export const getGlobalHistoricData = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASEURL}${ENDPOINTS.HistoricGlobal}`).then(res => {
      resolve(clusterHistoricData(res.data));
    });
  });
};

// helpers
const sortByCases = (data: any[]) => {
  const sortedData = data.sort((a, b) => b.cases - a.cases);
  return sortedData;
};

const clusterHistoricData = (data: any) => {
  const { cases, deaths, recovered } = data;
  const dataCluster = {
    cases: {},
    deaths: {},
    recovered: {}
  };
  // each is an object containing {date: count};
  console.time("begin cluster");
  for (let date in cases) {
    const month = moment(date).month();
    if (!(dataCluster.cases as any)[`${month}`]) {
      (dataCluster.cases as any)[`${month}`] = [cases[date]];
    } else {
      (dataCluster.cases as any)[`${month}`].push(cases[date]);
    }
  }
  for (let date in deaths) {
    const month = moment(date).month();
    if (!(dataCluster.deaths as any)[`${month}`]) {
      (dataCluster.deaths as any)[`${month}`] = [deaths[date]];
    } else {
      (dataCluster.deaths as any)[`${month}`].push(deaths[date]);
    }
  }
  for (let date in recovered) {
    const month = moment(date).month();
    if (!(dataCluster.recovered as any)[`${month}`]) {
      (dataCluster.recovered as any)[`${month}`] = [recovered[date]];
    } else {
      (dataCluster.recovered as any)[`${month}`].push(recovered[date]);
    }
  }
  return dataCluster;
};

export interface HistoricDataCluster {
  deaths: HistoricData;
  recovered: HistoricData;
  cases: HistoricData;
}

export interface HistoricData {
  month: number;
  count: number;
}

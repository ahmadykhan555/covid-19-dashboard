import axios from "axios";
const BASEURL = "https://corona.lmao.ninja/";
const ENDPOINTS = {
  AllCountries: "v2/countries",
  SelectedCountry: "v2/countries"
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

export const getDataForCountry = (country: string) => {
  return axios.get(`${BASEURL}${ENDPOINTS.SelectedCountry}/${country}`);
};

// helpers
const sortByCases = (data: any[]) => {
  const sortedData = data.sort((a, b) => b.cases - a.cases);
  return sortedData;
};

import axios from "axios";
const BASEURL = "https://corona.lmao.ninja/";
const ENDPOINTS = {
  AllCountries: "v2/countries",
  SelectedCountry: "v2/countries"
};
export const getAllCountriesData = () => {
  return axios.get(`${BASEURL}${ENDPOINTS.AllCountries}`);
};

export const getDataForCountry = (country: string) => {
  return axios.get(`${BASEURL}${ENDPOINTS.SelectedCountry}/${country}`);
};

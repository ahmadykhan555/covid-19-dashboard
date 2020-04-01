import axios from "axios";
const BASEURL = "https://corona.lmao.ninja/";
const ENDPOINTS = {
  AllCountries: "countries?sort=country",
  SelectedCountry: "countries/:country"
};
export const getAllCountriesData = () => {
  return axios.get(`${BASEURL}${ENDPOINTS.AllCountries}`);
};

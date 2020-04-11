import axios from "axios";
const BASEURL = "localhost:4200/";
const ENDPOINTS = {
  AllProvinces: "provinces"
};
export const getAllProvinces = () => {
  return axios.get(`${BASEURL}${ENDPOINTS.AllProvinces}`);
};

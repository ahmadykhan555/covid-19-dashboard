import axios from "axios";
const BASEURL = "localhost:4200/";
const ENDPOINTS = {
  AllProvinces: "provinces"
};
export const getAllProvinces = () => {
  return axios.get(`${BASEURL}${ENDPOINTS.AllProvinces}`);
};

export const sendProvinceData = (endpoint: string, params: any) => {
  return axios.post(`${BASEURL}${endpoint}`, params);
};

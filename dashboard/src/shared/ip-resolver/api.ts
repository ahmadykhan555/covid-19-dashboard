import { environment } from "./../environment/environment";
import axios from "axios";

export const resolveLocationByIp = () => {
  return axios.get(
    `http://api.ipstack.com/check?access_key=${environment.ipStackApiKey}`
  );
};

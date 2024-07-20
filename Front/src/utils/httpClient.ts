import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.response.use((response: AxiosResponse) => {
  if (response.data) {
    return response.data;
  }

  return response;
}, (err) => {
  console.log(err);
});

export const httpClient = instance;
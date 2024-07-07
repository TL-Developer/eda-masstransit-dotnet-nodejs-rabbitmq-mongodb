import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
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
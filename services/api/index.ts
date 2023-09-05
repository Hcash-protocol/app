import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
type SuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
  total: number;
};
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://api.scimta.com";

const axios = new Axios({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [(data) => JSON.parse(data)],
  transformRequest: [
    (data, headers) => {
      if (headers && headers["Content-Type"] == "application/json") {
        return JSON.stringify(data);
      }
      return data;
    },
  ],
});

axios.interceptors.request.use((config) => {
  if (config.headers) {
    try {
      config.headers["authorize"] = `Hcash protocol:${localStorage.getItem(
        "signature"
      )}`;
    } catch (error: any) {}
  }
  return config;
});

const AxiosPost = <O>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return axios.post<SuccessResponse<O>, AxiosResponse<SuccessResponse<O>>>(
    url,
    data,
    config
  );
};

const AxiosGet = <O>(url: string, config?: AxiosRequestConfig) =>
  axios.get<SuccessResponse<O>, AxiosResponse<SuccessResponse<O>>>(url, config);

const ApiServices = {
  hcash: {
    proof: (payload: any) => AxiosGet<any>("/proof", payload),
  },
};

export default ApiServices;

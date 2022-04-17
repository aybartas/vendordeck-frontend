import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5050/api/";

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  catalogList: () => requests.get("products"),
  productDetails: (id: number) => requests.get(`products/${id}`),
};
const TestErrors = {
  getServerError: () => requests.get("errorTest/server-error"),
  getValidationError: () => requests.get("errorTest/validation-error"),
  getUnauthorized: () => requests.get("errorTest/unauthorized"),
  getBadRequest: () => requests.get("errorTest/bad-request"),
  getNotFound: () => requests.get("errorTest/not-found"),
};

export const apiAgent = {
  Catalog,
  TestErrors,
};

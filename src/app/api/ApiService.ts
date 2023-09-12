import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { globalNavigate } from "../global/GlobalHistory";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 100));

axios.defaults.baseURL = "http://localhost:5050/api/";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data = {}, status = 500 } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            modelStateErrors.push(data.errors[key]);
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title || "Unauthorized");
        break;
      case 404:
        toast.error(data.title || "Not Found");
        break;
      case 302:
        toast.error("Unauthorized");
        break;
      case 500:
        globalNavigate("/server-error", { state: { error: data } });
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
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  catalogList: (params?: URLSearchParams) => requests.get("products", params),
  productDetails: (id: number) => requests.get(`products/${id}`),
  filterValues: () => requests.get("products/filters"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (produtId: number, quantity = 1) =>
    requests.post("basket", {
      ProductId: produtId,
      Quantity: quantity,
    }),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const User = {
  login: (loginRequest: {}) => requests.post("users/login", loginRequest),
  register: (registerRequest: {}) =>
    requests.post("users/register", registerRequest),
  getCurrentUser: () => requests.get("users/currentUser"),
};

const Order = {
  createOrder: (createOrderRequest: {}) =>
    requests.post("orders", createOrderRequest),
  getOrderById: (id: string) => requests.get(`orders/${id}`),
  orderList: (params?: URLSearchParams) => requests.get("orders", params),
};

const TestErrors = {
  getServerError: () =>
    requests
      .get("errorTest/server-error")
      .catch((error: AxiosError) => console.log(error)),
  getValidationError: () => requests.get("errorTest/validation-error"),
  getUnauthorized: () => requests.get("errorTest/unauthorized"),
  getBadRequest: () => requests.get("errorTest/bad-request"),
  getNotFound: () => requests.get("errorTest/not-found"),
};

export const apiAgent = {
  Catalog,
  TestErrors,
  Basket,
  User,
  Order,
};

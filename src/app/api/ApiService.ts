import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5050/api/";
axios.defaults.withCredentials = true;


axios.interceptors.response.use(
  (  response: any) => { return response},
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        console.log(data.title);
        // toast.error(data.title);
        break;
      case 401:
        console.log(data.title)
        // toast.error(data.title);
        break;
      case 500:
        console.log(data.title)
        // toast.error(data.title);
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

const Basket = {
  get : () => requests.get("basket"),
  addItem : (produtId : number, quantity = 1) => requests.post("basket",
  {
    ProductId: produtId,
    Quantity: quantity
  }),
  removeItem : (productId : number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`) 
}
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
  Basket
};

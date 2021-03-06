import axios from "axios";

const BACKEND_URL = `https://5.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response) {
      if (response.status === HttpCode.UNAUTHORIZED) {
        onUnauthorized();
        throw err;
      } else {
        throw new Error(`${response.status}; text: ${response.statusText};
      method: ${response.config.method};
      url: ${response.config.url};
      data-error: ${response.data.error}
      `);
      }
    } else if (err.request) {
      throw new Error(`${err.request}`);
    } else {
      throw new Error(
          `Error message: ${err.message}.
          Error config: ${err.config}`
      );
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

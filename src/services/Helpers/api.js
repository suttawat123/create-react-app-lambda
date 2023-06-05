import { getAuthentication } from "./securityGuard";
import axios from "axios";
import { END_POINT } from "../../config/base";

let currentAuthToken = {};

export const Domain = () => {
  // return "https://moderntage-api.herokuapp.com/api/v1/";
  return END_POINT;
};

export function setAuthToken(currentAccess) {
  currentAuthToken = currentAccess;
}

export function setIsRefreshToken(isRefresh) {
  window.$refresh_token = isRefresh;
}

export function getIsRefreshToken() {
  return window.$refresh_token ? window.$refresh_token : false;
}

export function getAuthToken() {
  return currentAuthToken;
}

export const IsCheckRefreshToken = () => {
  return new Promise((resolve, reject) => {
    let refresh = getIsRefreshToken();
    if (refresh) {
      setTimeout(() => {
        resolve(refresh);
      }, 2000);
    } else {
      resolve(refresh);
    }
  });
};

function getApiHeader(token) {
  let Authentication = getAuthentication();
  let tokenData = "";

  if (token !== undefined && token !== null && token !== "") {
    tokenData = "Bearer " + token;
  } else if (
    Authentication.result &&
    Authentication.result.access_token !== undefined &&
    Authentication.result.access_token !== null &&
    Authentication.result.access_token !== ""
  ) {
    tokenData = "Bearer " + Authentication.result.access_token;
  } else {
    tokenData = "Bearer " + currentAuthToken.access_token;
  }

  return tokenData;
}

export const axiosSuccess = (result) => {
  return result;
};

export const axiosError = (error) => {
  return error.response;
};

export const post = (url, data) => {
  let urlSend = Domain() + url;
  let tokenSend = getApiHeader();

  return axios
    .post(urlSend, data, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: tokenSend,
      },
      withCredentials: false,
    })
    .then(axiosSuccess)
    .catch(axiosError);
};

export const postURLSearchParams = (url, data) => {
  let urlSend = Domain() + url;
  let tokenSend = getApiHeader();

  return axios
    .post(urlSend, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: tokenSend,
      },
      withCredentials: false,
    })
    .then(axiosSuccess)
    .catch(axiosError);
};

export const get = (url, params) => {
  let urlSend = Domain() + url;
  let tokenSend = getApiHeader();

  return axios
    .get(urlSend, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: tokenSend,
      },
      withCredentials: false,
      params: params,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

export const put = (url, body) => {
  let urlSend = Domain() + url;
  let tokenSend = getApiHeader();

  return axios
    .put(urlSend, body, {
      headers: {
        Authorization: tokenSend,
      },
      withCredentials: false,
    })
    .then(axiosSuccess)
    .catch(axiosError);
};

export const deleteAxios = (url, param) => {
  let urlSend = Domain() + url;
  let tokenSend = getApiHeader();

  return axios
    .delete(urlSend, {
      headers: {
        Authorization: tokenSend,
      },
      withCredentials: false,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
};

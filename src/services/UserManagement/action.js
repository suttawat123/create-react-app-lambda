import { deleteAxios, get, postURLSearchParams, put } from "../Helpers/api";
import {
  API_FETCH_DATA_USER,
  API_FETCH_DATA_ROLE,
  API_FETCH_SET_PASSWORD,
} from "./actionApi";
import { SET_USER_ID } from "./actionTypes";

export const fetchCreateUser = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });

    postURLSearchParams(API_FETCH_DATA_USER, params)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataUser = (page, role) => async (dispatch, getState) => {
  let api = API_FETCH_DATA_USER + "?limit=10&page=" + page;
  if (role) {
    api = api + "&role=" + role;
  }

  return new Promise((resolve, reject) => {
    get(api)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataRoleUser = () => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_FETCH_DATA_ROLE)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchResetPassword = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    put(API_FETCH_SET_PASSWORD + "?user_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataUserByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_FETCH_DATA_USER + "?_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchUpdateUserByID = (id, body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    put(API_FETCH_DATA_USER + "?user_id=" + id, formData)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataUserByRole = (role) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_FETCH_DATA_USER + "?role=" + role)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const setUserID = (text) => (dispatch, getState) => {
  dispatch({
    type: SET_USER_ID,
    payload: text,
  });
};

export const fetchDeleteUserByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteAxios(API_FETCH_DATA_USER + "?user_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

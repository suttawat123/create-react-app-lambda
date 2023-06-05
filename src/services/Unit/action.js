import { get, postURLSearchParams, put, deleteAxios } from "../Helpers/api";
import { API_UNIT } from "./actionApi";

export const fetchCreateUnit = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });

    postURLSearchParams(API_UNIT, params)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataUnit = (page, name) => async (dispatch, getState) => {
  let api = API_UNIT + "?limit=10&page=" + page;
  if (name) {
    api = api + "&name=" + name;
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

export const fetchDataUnitNoLimit = (page) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_UNIT)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataUnitByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_UNIT + "?_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchUpdateUnitByID = (id, body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // Object.keys(body).forEach((key) => {
    //   formData.append(key, body[key]);
    // });
    put(API_UNIT + "?unit_id=" + id, body)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDeleteUnitByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteAxios(API_UNIT + "?unit_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

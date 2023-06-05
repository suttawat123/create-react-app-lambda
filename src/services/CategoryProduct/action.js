import { get, postURLSearchParams, put, deleteAxios } from "../Helpers/api";
import { API_CATEGORY_PRODUCT } from "./actionApi";

export const fetchCreateCategoryProduct = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });

    postURLSearchParams(API_CATEGORY_PRODUCT, params)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataCategoryProduct = (page, name) => async (dispatch, getState) => {
  let api = API_CATEGORY_PRODUCT + "?limit=10&page=" + page;
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

export const fetchDataCategoryProductNoLimit = (page) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_CATEGORY_PRODUCT)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataCategoryProductByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_CATEGORY_PRODUCT + "?_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchUpdateCategoryProductByID = (id, body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // Object.keys(body).forEach((key) => {
    //   formData.append(key, body[key]);
    // });
    put(API_CATEGORY_PRODUCT + "?category_product_id=" + id, body)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDeleteCategoryProductByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteAxios(API_CATEGORY_PRODUCT + "?category_product_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

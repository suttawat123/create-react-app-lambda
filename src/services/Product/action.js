import { get, postURLSearchParams, put, deleteAxios } from "../Helpers/api";
import { API_PRODUCT } from "./actionApi";

export const fetchCreateProduct = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });

    postURLSearchParams(API_PRODUCT, params)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataProduct =
  (page, name, code, category_product) => async () => {
    let api = API_PRODUCT + "?limit=10&page=" + page;
    if (name) {
      api = api + "&name=" + name;
    }
    if (code) {
      api = api + "&code=" + code;
    }
    if (category_product) {
      api = api + "&category_product=" + category_product;
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

export const fetchDataProductNoLimit = (page) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_PRODUCT)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataProductByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_PRODUCT + "?_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchUpdateProductByID =
  (id, body) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // const formData = new FormData();
      // Object.keys(body).forEach((key) => {
      //   formData.append(key, body[key]);
      // });
      put(API_PRODUCT + "?product_id=" + id, body)
        .then(async (res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const fetchDeleteProductByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteAxios(API_PRODUCT + "?product_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

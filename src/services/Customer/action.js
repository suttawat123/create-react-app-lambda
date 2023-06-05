import { get, postURLSearchParams, put, deleteAxios } from "../Helpers/api";
import { API_CUSTOMER } from "./actionApi";

export const fetchCreateCustomer = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });

    postURLSearchParams(API_CUSTOMER, params)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataCustomer = (page, name, code) => async () => {
  let api = API_CUSTOMER + "?limit=10&page=" + page;
  if (name) {
    api = api + "&name=" + name;
  }
  if (code) {
    api = api + "&code=" + code;
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

export const fetchDataCustomerNoLimit =
  (page) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      get(API_CUSTOMER)
        .then(async (res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const fetchDataCustomerByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_CUSTOMER + "?_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchUpdateCustomerByID =
  (id, body) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // const formData = new FormData();
      // Object.keys(body).forEach((key) => {
      //   formData.append(key, body[key]);
      // });
      put(API_CUSTOMER + "?customer_id=" + id, body)
        .then(async (res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const fetchDeleteCustomerByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteAxios(API_CUSTOMER + "?customer_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

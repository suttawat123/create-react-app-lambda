import { get, postURLSearchParams, put, deleteAxios } from "../Helpers/api";
import { API_POS } from "./actionApi";

export const fetchCreatePos = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });

    postURLSearchParams(API_POS, params)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataPos = (page, code_bill) => async () => {
  let api = API_POS + "?limit=10&page=" + page;
  if (code_bill) {
    api = api + "&code_bill=" + code_bill;
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

export const fetchDataPosRealSaleFalse = (page, code_bill) => async () => {
  let api = API_POS + "?limit=10&page=" + page + "&real_sale=" + false;

  if (code_bill) {
    api = api + "&code_bill=" + code_bill;
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

export const fetchDataPosNoLimit = (page) => async () => {
  return new Promise((resolve, reject) => {
    get(API_POS)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDataPosByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    get(API_POS + "?_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchUpdatePosByID = (id, body) => async () => {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // Object.keys(body).forEach((key) => {
    //   formData.append(key, body[key]);
    // });
    put(API_POS + "?pos_id=" + id, body)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDeletePosByID = (id) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteAxios(API_POS + "?pos_id=" + id)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

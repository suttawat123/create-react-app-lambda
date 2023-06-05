import axios from "axios";
import { Domain, postURLSearchParams, setAuthToken } from "../Helpers/api";
import { setAuthentication } from "../Helpers/securityGuard";
import { API_FETCH_LOGIN } from "./actionApi";
import { FETCH_LOGIN } from "./actionTypes";

export const fetchLogin = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios
      .post(Domain() + API_FETCH_LOGIN, body)
      .then(async (res) => {
        let { data } = res;

        if (res.status === 200) {
          dispatch({
            type: FETCH_LOGIN,
            payload: data,
          });
          await setAuthentication(data);
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchLogout = (body) => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    postURLSearchParams("logout", {})
      .then(async (res) => {
        dispatch({
          type: FETCH_LOGIN,
          payload: [],
        });
        window.localStorage.clear();
        setAuthToken({});
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

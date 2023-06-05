import {
  SET_ADMIN_MENU_ACTIVE,
  SET_AGENT_MENU_ACTIVE,
  SET_FETCH_FAIL,
  SET_AGENT_GARAGE_MENU,
} from "./actionTypes";
// import { getMenu } from '../SecurityGuard';
//function set admin router active
export const setAdminActive = (Id) => (dispatch) => {
  dispatch({
    type: SET_ADMIN_MENU_ACTIVE,
    payload: Id,
  });
};

//function set agent router active
export const setAgentActive = (Id) => (dispatch) => {
  dispatch({
    type: SET_AGENT_MENU_ACTIVE,
    payload: Id,
  });
};

//set load data error
export const setFetchFail = (data) => (dispatch) => {
  dispatch({
    type: SET_FETCH_FAIL,
    payload: data,
  });
};

export const setAgentGarageMenu = (garageMenu) => (dispatch) => {
  dispatch({
    type: SET_AGENT_GARAGE_MENU,
    payload: garageMenu.menuurl,
  });
};

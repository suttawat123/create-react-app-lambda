import { FETCH_LOGIN, FETCH_LOGOUT, SET_USER_ID } from "./actionTypes";
import { getAuthentication } from "../Helpers/securityGuard";

const initialState = {
  Authentication: getAuthentication(),
  userID: "",
};

export default function UserManagement(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOGIN:
      return {
        ...state,
        Authentication: action.payload,
      };

    case FETCH_LOGOUT:
      return {
        ...state,
        Authentication: {},
      };

    case SET_USER_ID:
      return {
        ...state,
        userID: action.payload,
      };

    default:
      return state;
  }
}

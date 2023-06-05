import { FETCH_LOGIN, FETCH_LOGOUT } from "./actionTypes";
import { getAuthentication } from "../Helpers/securityGuard";

const initialState = {
  Authentication: getAuthentication(),
};

export default function Auth(state = initialState, action) {
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

    default:
      return state;
  }
}

/* eslint-disable import/no-anonymous-default-export */
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export default (initialState) => {
  initialState =
    JSON.parse(window.localStorage.getItem("state")) || initialState;
  const middleware = [thunk];

  const store = createStore(
    rootReducer,
    initialState,
    compose(composeWithDevTools(applyMiddleware(...middleware)))
  );

  return store;
};

export const store = createStore(rootReducer);

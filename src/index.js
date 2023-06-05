import React from "react";
import ReactDOM from "react-dom";
// import { HashRouter } from "react-router-dom";
import Root from "./Root";
import * as registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import "./assets/scss/style.css";
import "./index.css";

ReactDOM.render(
  <Root>
    {/* <HashRouter> */}
      <App />
    {/* </HashRouter> */}
  </Root>,
  document.getElementById("root")
);

registerServiceWorker.unregister();

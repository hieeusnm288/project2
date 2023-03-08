import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
// import {} from "./mobxContext/MobxContext";
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//add a message to remind user
setTimeout(() => {
  let el = document.getElementById("inputter");
  if (el.value == "") {
    el.placeholder = "type!!";
  }
}, 5000);

//reset after
setTimeout(() => {
  let el = document.getElementById("inputter");
  el.placeholder = "";
}, 10000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

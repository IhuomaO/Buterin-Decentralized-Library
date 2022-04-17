import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider serverUrl="https://ujwb1som3llq.usemoralis.com:2053/server" appId="TPzse1a4T6YsxrbB5Em4weILu5cR0AUplKU43QsZ"> */}
    <App />
    {/* </MoralisProvider> */}

  </React.StrictMode>,
  document.getElementById("root")
);

// const serverUrl = "https://ujwb1som3llq.usemoralis.com:2053/server"
// const appId = "TPzse1a4T6YsxrbB5Em4weILu5cR0AUplKU43QsZ"
// Moralis.start({ serverUrl, appId });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

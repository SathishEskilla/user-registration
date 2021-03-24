import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// importing customed components and styles
import "./App.scss";
import Registration from "./components/registration/Registration";

function App() {
  return (
    <div className="app-component">
      <div className="app-component__header">
        <a
          className="app-component__header__left-section"
          href="https://www.cashewpayments.com/"
        >
          <img src={"/Logo.png"} alt="logo" />
        </a>
        <div className="app-component__header__right-section">
          <a href="https://www.cashewpayments.com/">How it works</a>
          <a href="https://www.cashewpayments.com/">For business</a>
        </div>
      </div>
      <Registration></Registration>
    </div>
  );
}

export default App;

import React from "react";
import "../styles/App.css";
import Routes from "../Routes";
import { BrowserRouter } from "react-router-dom";
import history from "./history";

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes />
    </BrowserRouter>
  );
}

export default App;

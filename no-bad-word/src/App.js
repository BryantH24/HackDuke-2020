import React from "react";
import "./App.css";
import Routes from "./routes";
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

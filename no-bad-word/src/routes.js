// contains routes to all pages in react app
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Homepage from "./pages/homepage";
import Editor from "./pages/editor";

// need to add routes for the rest of pages once merged to master

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/editor" component={Editor} />
        </Switch>
      </Router>
    );
  }
}

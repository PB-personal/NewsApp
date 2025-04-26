import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <News
                key="general"
                country="us"
                pageSize={5}
                category="general"
              />
            </Route>
            <Route exact path="/general">
              <News
                key="general"
                country="us"
                pageSize={5}
                category="general"
              />
            </Route>
            <Route exact path="/business">
              <News
                key="business"
                country="us"
                pageSize={5}
                category="business"
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                key="entertainment"
                country="us"
                pageSize={5}
                category="entertainment"
              />
            </Route>
            <Route exact path="/science">
              <News
                key="science"
                country="us"
                pageSize={5}
                category="science"
              />
            </Route>
            <Route exact path="/sports">
              <News key="sports" country="us" pageSize={5} category="sports" />
            </Route>
            <Route exact path="/health">
              <News key="health" country="us" pageSize={5} category="health" />
            </Route>
            <Route exact path="/technology">
              <News
                key="technology"
                country="us"
                pageSize={20}
                category="technology"
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

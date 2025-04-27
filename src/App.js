import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
  //  {this.apiKey}
    console.log('apikey',this.apiKey);
    return (
      <Router>
        <div>
          <NavBar />
          <LoadingBar
            color="#f11946"
            height={5}
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="general"
                country="us"
                pageSize={5}
                category="general"
              />
            </Route>
            <Route exact path="/general">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="general"
                country="us"
                pageSize={5}
                category="general"
              />
            </Route>
            <Route exact path="/business">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="business"
                country="us"
                pageSize={5}
                category="business"
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="entertainment"
                country="us"
                pageSize={5}
                category="entertainment"
              />
            </Route>
            <Route exact path="/science">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="science"
                country="us"
                pageSize={5}
                category="science"
              />
            </Route>
            <Route exact path="/sports">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="sports"
                country="us"
                pageSize={5}
                category="sports"
              />
            </Route>
            <Route exact path="/health">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="health"
                country="us"
                pageSize={5}
                category="health"
              />
            </Route>
            <Route exact path="/technology">
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
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

import "./App.css";
import React, { Component } from "react";
import Nav from "./Components/Nav";
import { Router } from "@reach/router";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import ErrorDisplayer from "./Components/ErrorDisplayer";

class App extends Component {
  state = {
    username: "",
  };

  updateUsername = (user) => {
    this.setState({ username: user });
  };
  render() {
    return (
      <div className="App">
        <Nav
          updateUsername={this.updateUsername}
          loggedIn={this.state.username}
        />

        <Router>
          <Articles path="/" />
          <Articles path="/:topic/articles" />
          <SingleArticle
            path="/articles/:article_id"
            user={this.state.username}
          />
          <ErrorDisplayer default status={404} msg={"path not found"} />
        </Router>
      </div>
    );
  }
}

export default App;

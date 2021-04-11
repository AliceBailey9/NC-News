import "./App.css";
import React, { Component } from "react";
import Nav from "./Components/Nav";
import { Router } from "@reach/router";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";

class App extends Component {
  state = {
    username: "grumpy19",
  };

  updateUsername = (user) => {
    this.setState({ username: user });
  };
  render() {
    return (
      <div className="App">
        <Nav updateUsername={this.updateUsername} />

        <Router>
          <Articles path="/" />
          <Articles path="/:topic/articles" />
          <SingleArticle
            path="/articles/:article_id"
            user={this.state.username}
          />
        </Router>
      </div>
    );
  }
}

export default App;

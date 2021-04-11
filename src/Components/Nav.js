import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "../api";
import { usersArray } from "../utils";

class Nav extends Component {
  state = {
    topics: [],
    user: "",
  };

  handleChange = (key, text) => {
    this.setState({ [key]: text });
  };

  handleSubmit = (event) => {
    const { user } = this.state;
    event.preventDefault();
    for (let i = 0; i < usersArray.length; i++) {
      if (user === usersArray[i]) {
        this.props.updateUsername(user);
      }
    }
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics: topics });
    });
  }
  render() {
    return (
      <nav className="navBar">
        <Link id="mcrNewsLogo" to="/">
          Mcr News
        </Link>
        {this.state.topics.map(({ slug }) => {
          return (
            <Link className="topicsNav" key={slug} to={`/${slug}/articles`}>
              {slug}
            </Link>
          );
        })}
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input
            id="login-w-user"
            type="text"
            onChange={(event) => this.handleChange("user", event.target.value)}
          ></input>
          <button>Login</button>
        </form>
        {/* <button className="login-btns">Login</button>
        <button className="login-btns">Sign-Up</button> */}
      </nav>
    );
  }
}

export default Nav;

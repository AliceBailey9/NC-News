import React, { Component } from "react";
import { Link } from "@reach/router";
import { getTopics } from "../api";

class Nav extends Component {
  state = {
    topics: [],
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
          Manchester News
        </Link>
        {this.state.topics.map(({ slug }) => {
          return (
            <Link className="topicsNav" key={slug} to={`/${slug}/articles`}>
              {slug}
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default Nav;

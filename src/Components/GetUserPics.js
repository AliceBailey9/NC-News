import React, { Component } from "react";
import { getUser } from "../api";

class GetUserPics extends Component {
  state = {
    usernamePhoto: "",
  };

  componentDidMount() {
    getUser(this.props.username).then((user) => {
      this.setState({ usernamePhoto: user.avatar_url });
    });
  }

  render() {
    return (
      <div>
        <img
          className="username-photo"
          src={this.state.usernamePhoto}
          alt="username"
        ></img>
      </div>
    );
  }
}

export default GetUserPics;

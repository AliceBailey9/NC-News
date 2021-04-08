import React, { Component } from "react";
import { postComment } from "../api";

class AddComment extends Component {
  state = {
    user: "",
    body: "",
  };

  handleChange = (key, text) => {
    this.setState({ [key]: text });
  };

  handleSubmit = (event) => {
    const { user, body } = this.state;
    event.preventDefault();

    postComment({ author: user, body: body }, this.props.article_id).then(
      (newPostedComment) => {
        this.props.addPostedComment(newPostedComment);
        this.setState({ user: "", body: "" });
      }
    );
  };

  render() {
    const { user, body } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>user</label>
        <input
          id="commentUser"
          type="text"
          value={user}
          onChange={(event) => this.handleChange("user", event.target.value)}
        ></input>

        <label>comment</label>
        <input
          id="commentBody"
          type="text"
          value={body}
          onChange={(event) => this.handleChange("body", event.target.value)}
        ></input>
        <button>Post Comment</button>
      </form>
    );
  }
}

export default AddComment;

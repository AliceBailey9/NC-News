import React, { Component } from "react";
import { postComment } from "../api";

class AddComment extends Component {
  state = {
    body: "",
  };

  handleChange = (key, text) => {
    this.setState({ [key]: text });
  };

  handleSubmit = (event) => {
    const { body } = this.state;
    event.preventDefault();

    postComment(
      { author: this.props.user, body: body },
      this.props.article_id
    ).then((newPostedComment) => {
      this.props.addPostedComment(newPostedComment);
      this.setState({ user: "", body: "" });
    });
  };

  render() {
    const { body } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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

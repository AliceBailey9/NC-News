import React, { Component } from "react";
import { postComment } from "../api";
import ErrorDisplayer from "./ErrorDisplayer";

class AddComment extends Component {
  state = {
    body: "",
    err: null,
  };

  handleChange = (key, text) => {
    this.setState({ [key]: text });
  };

  handleSubmit = (event) => {
    const { body } = this.state;
    event.preventDefault();

    postComment({ author: this.props.user, body: body }, this.props.article_id)
      .then((newPostedComment) => {
        this.props.addPostedComment(newPostedComment);
        this.setState({ user: "", body: "" });
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  };

  render() {
    const { body, err } = this.state;

    if (err) {
      return (
        <ErrorDisplayer
          status={err.response.status}
          msg={err.response.data.msg}
        />
      );
    }

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

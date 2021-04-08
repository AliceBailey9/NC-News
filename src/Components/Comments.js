import React, { Component } from "react";
import { getCommentsByid } from "../api";
import Loader from "./Loader";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    getCommentsByid(this.props.article_id).then((comments) => {
      this.setState({ comments: comments, isLoading: false });
    });
  }
  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <div>
        <ul>
          {this.state.comments.map(({ comment_id, author, votes, body }) => {
            return (
              <li key={comment_id}>
                {author}
                {body}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Comments;

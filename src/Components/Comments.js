import React, { Component } from "react";
import { getCommentsByid } from "../api";

class Comments extends Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    getCommentsByid(this.props.article_id).then((comments) => {
      this.setState({ comments: comments });
    });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.comments.map(({ comment_id, author, votes, body }) => {
            return <li key={comment_id}>{body}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Comments;

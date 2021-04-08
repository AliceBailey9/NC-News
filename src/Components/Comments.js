import React, { Component } from "react";
import { getCommentsByid } from "../api";
import Loader from "./Loader";
import AddComment from "./AddComment";
import GetUserPics from "./GetUserPics";

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

  addPostedComment = (newComment) => {
    this.setState((currState) => {
      const updatedState = {
        comments: [newComment, ...currState.comments],
        isLoading: false,
      };
      return updatedState;
    });
  };
  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <div>
        <AddComment
          article_id={this.props.article_id}
          addPostedComment={this.addPostedComment}
        />
        <ul>
          {this.state.comments.map(({ comment_id, author, votes, body }) => {
            return (
              <li key={comment_id}>
                <GetUserPics username={author} />
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

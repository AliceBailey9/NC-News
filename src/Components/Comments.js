import React, { Component } from "react";
import { getCommentsByid } from "../api";
import Loader from "./Loader";
import AddComment from "./AddComment";
import GetUserPics from "./GetUserPics";
import LikeButton from "./LikeButton";
import DeleteComment from "./DeleteComment";

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

  removeComment = (comment_id) => {
    this.setState((currState) => {
      const updatedComment = currState.comments.filter(
        (comment) => comment.comment_id !== comment_id
      );
      const updatedState = {
        comments: updatedComment,
        isLoading: false,
      };
      return updatedState;
    });
  };

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
              <li key={comment_id} className="comment-container">
                <GetUserPics username={author} className="comment-pic-item" />{" "}
                <h3 className="comment-username-item">{author}</h3>
                <p className="comment-item">{body}</p>
                <LikeButton likes={votes} id={comment_id} type="comments" />
                <DeleteComment
                  comment_id={comment_id}
                  removeComment={this.removeComment}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Comments;

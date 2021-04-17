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

  onUserChange = (numLikes, id) => {
    this.setState((currState) => {
      const updatedComments = [...currState.comments];
      for (let i = 0; i < updatedComments.length; i++) {
        if (updatedComments[i].comment_id === id)
          updatedComments[i].comment_id =
            updatedComments[i].comment_id + numLikes;
      }
      const updatedState = {
        comments: updatedComments,
        isLoading: false,
      };
      return updatedState;
    });
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
      <div className="comment-container">
        <AddComment
          user={this.props.user}
          article_id={this.props.article_id}
          addPostedComment={this.addPostedComment}
        />
        <ul>
          {this.state.comments.map(({ comment_id, author, votes, body }) => {
            return (
              <li key={comment_id}>
                <div className="whole-comment">
                  <GetUserPics username={author} className="comment-pic-item" />{" "}
                  <div className="comment-info">
                    <p className="comment-username">{author}</p>
                    <p className="comment-body">{body}</p>
                  </div>
                </div>
                <LikeButton
                  likes={votes}
                  id={comment_id}
                  type="comments"
                  user={this.props.user}
                  onUserChange={this.onUserChange}
                />
                {this.props.user === author ? (
                  <DeleteComment
                    comment_id={comment_id}
                    removeComment={this.removeComment}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Comments;

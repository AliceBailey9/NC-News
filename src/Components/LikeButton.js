import React from "react";
import { addLike } from "../api";
import { Component } from "react";

class LikeButton extends Component {
  state = {
    likeChanges: 0,
    err: null,
  };

  handleClick = (num, id, type) => {
    this.setState((currState) => {
      const updatedState = {
        likeChanges: currState.likeChanges + num,
        err: null,
      };
      return updatedState;
    });
    addLike({ inc_votes: num }, id, type).catch((err) => {
      this.setState((currState) => {
        return { likeChanges: currState.likeChanges - num, err: err };
      });
    });
  };

  render() {
    return (
      <div className="like-btn-area">
        <button
          className="like-dislike-btn"
          onClick={() => {
            this.handleClick(1, this.props.id, this.props.type);
          }}
        >
          ↑{" "}
        </button>
        {this.state.err ? (
          <p>Sorry you're like could not be posted</p>
        ) : (
          <p>{this.props.likes + this.state.likeChanges}</p>
        )}

        <button
          className="like-dislike-btn"
          onClick={() => {
            this.handleClick(-1, this.props.id, this.props.type);
          }}
        >
          ↓{" "}
        </button>
      </div>
    );
  }
}
export default LikeButton;

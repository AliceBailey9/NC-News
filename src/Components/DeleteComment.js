import React from "react";
import { deleteComment } from "../api";

function DeleteComment(props) {
  const handleClick = (comment_id) => {
    deleteComment(comment_id)
      .then((res) => {
        props.removeComment(comment_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClick(props.comment_id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteComment;

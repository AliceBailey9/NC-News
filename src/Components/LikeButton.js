import React from "react";
import { addLike } from "../api";

function LikeButton(props) {
  const handleClick = (num) => {
    const article_id = props.article_id;
    props.updateLikes(num);
    addLike({ inc_votes: num }, article_id).then((article) => {
      console.log(article);
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClick(1);
        }}
      >
        Like{" "}
      </button>
      <button
        onClick={() => {
          handleClick(-1);
        }}
      >
        Dislike{" "}
      </button>
    </div>
  );
}

export default LikeButton;

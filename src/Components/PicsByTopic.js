import React from "react";
import {
  randomImage,
  codingImages,
  cookingImages,
  footballImages,
} from "../utils";

function PicsByTopic(props) {
  return (
    <div className="pic-item">
      {props.topicType === "coding" ? (
        <div className="group-pics">
          <img
            className="pics"
            src={randomImage(codingImages)}
            alt="coding"
          ></img>
        </div>
      ) : null}
      {props.topicType === "cooking" ? (
        <div>
          <img
            className="pics"
            src={randomImage(cookingImages)}
            alt="cookng"
          ></img>
        </div>
      ) : null}
      {props.topicType === "football" ? (
        <div>
          <img
            className="pics"
            src={randomImage(footballImages)}
            alt="football"
          ></img>
        </div>
      ) : null}
    </div>
  );
}

export default PicsByTopic;

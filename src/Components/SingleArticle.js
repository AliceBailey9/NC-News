import React, { Component } from "react";
import { getArticleById } from "../api";
import Comments from "./Comments";
import Loader from "./Loader";
import LikeButton from "./LikeButton";
import {
  randomImage,
  codingImages,
  cookingImages,
  footballImages,
} from "../utils";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
  };

  componentDidMount = () => {
    getArticleById(this.props.article_id).then((article) => {
      this.setState({ article: article, isLoading: false });
    });
  };

  updateLikes = (num) => {
    this.setState((currState) => {
      const stateUpdate = {
        article: { ...currState.article },
        isLoading: false,
      };
      stateUpdate.article.votes = stateUpdate.article.votes + num;
      console.log(stateUpdate);
      return stateUpdate;
    });
  };

  render() {
    console.log(this.state);
    const { isLoading, article } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <section>
        {article.topic === "coding" ? (
          <div>
            <img
              className="pics"
              src={randomImage(codingImages)}
              alt="coding"
            ></img>
          </div>
        ) : null}
        {article.topic === "cooking" ? (
          <div>
            <img
              className="pics"
              src={randomImage(cookingImages)}
              alt="cookng"
            ></img>
          </div>
        ) : null}
        {article.topic === "football" ? (
          <div>
            <img
              className="pics"
              src={randomImage(footballImages)}
              alt="football"
            ></img>
          </div>
        ) : null}
        <h1>{article.title}</h1>
        {article.body}
        <small>{article.author}</small>
        <p> Likes: {article.votes}</p>
        <LikeButton
          updateLikes={this.updateLikes}
          article_id={this.state.article.article_id}
        />
        <h2>Comments</h2>
        <Comments article_id={article.article_id} />
      </section>
    );
  }
}

export default SingleArticle;

import React, { Component } from "react";
import { getArticleById } from "../api";
import Comments from "./Comments";
import Loader from "./Loader";
import LikeButton from "./LikeButton";

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

import React, { Component } from "react";
import { getArticleById } from "../api";
import Comments from "./Comments";
import Loader from "./Loader";
import LikeButton from "./LikeButton";
import PicsByTopic from "./PicsByTopic";

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

  render() {
    console.log(this.state);
    const { isLoading, article } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <section id="article-background">
        <div className="single-article">
          <PicsByTopic topicType={article.topic} />
          <h1>{article.title}</h1>
          <h2>{article.author}</h2>
          {article.body}
          <small>{article.author}</small>
        </div>
        <LikeButton
          likes={this.state.article.votes}
          article_id={this.state.article.article_id}
        />
        <Comments article_id={article.article_id} />
      </section>
    );
  }
}

export default SingleArticle;

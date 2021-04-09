import React, { Component } from "react";
import { getArticleById } from "../api";
import Comments from "./Comments";
import Loader from "./Loader";
import LikeButton from "./LikeButton";
import PicsByTopic from "./PicsByTopic";
import GetUserPics from "./GetUserPics";

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
    const { isLoading, article } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <section id="article-background">
        <div className="single-article">
          <div className="pic-container">
            <PicsByTopic topicType={article.topic} />
          </div>

          <div className="article-info-item">
            <h1>{article.title}</h1>
            <h2>{article.author}</h2>
            <GetUserPics username={article.author} />
          </div>
        </div>
        <div className="body-item">
          <p>{article.body}</p>
          <LikeButton
            likes={article.votes}
            id={article.article_id}
            type="articles"
          />
        </div>

        <Comments article_id={article.article_id} />
      </section>
    );
  }
}

export default SingleArticle;

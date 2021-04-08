import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";
import Loader from "./Loader";
import PicsByTopic from "./PicsByTopic";
import LikeButton from "./LikeButton";
import GetUserPics from "./GetUserPics";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidMount() {
    getArticles(this.props.topic).then((articles) => {
      this.setState({ articles: articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps) {
    const currentTopic = this.props.topic;
    if (currentTopic !== prevProps.topic) {
      getArticles(currentTopic).then((articles) => {
        this.setState({ articles: articles });
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <div class="flexbox-container">
        {this.state.articles.map(
          ({
            article_id,
            author,
            title,
            created_at,
            topic,
            votes,
            comment_count,
          }) => {
            return (
              <div key={article_id} className="flexbox-item">
                <Link
                  className="article-header"
                  key={article_id}
                  to={`/articles/${article_id}`}
                >
                  <small>{created_at}</small>
                  <h1>{title}</h1>
                </Link>
                <div className="article-style">
                  <PicsByTopic topicType={topic} />
                  <h2>User: {author}</h2>
                  <GetUserPics username={author} />
                  <p>{comment_count} Comments </p>
                </div>
                <LikeButton likes={votes} article_id={article_id} />
              </div>
            );
          }
        )}
      </div>
    );
  }
}

export default Articles;

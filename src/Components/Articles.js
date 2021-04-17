import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";
import Loader from "./Loader";
import PicsByTopic from "./PicsByTopic";
import LikeButton from "./LikeButton";
import GetUserPics from "./GetUserPics";
import ErrorDisplayer from "./ErrorDisplayer";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    getArticles(this.props.topic)
      .then((articles) => {
        this.setState({ articles: articles, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err: err, isLoading: false });
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
    const { isLoading, err } = this.state;

    if (err) {
      return (
        <ErrorDisplayer
          status={err.response.status}
          msg={err.response.data.msg}
        />
      );
    } else if (isLoading) {
      return <Loader />;
    }

    return (
      <div className="flexbox-container">
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
                <div className="all-articles-userInfo">
                  <GetUserPics username={author} />
                  <small>{author}</small>
                  <small>{created_at}</small>
                </div>
                <Link
                  className="article-header"
                  key={article_id}
                  to={`/articles/${article_id}`}
                >
                  <p>{title}</p>
                </Link>

                <PicsByTopic topicType={topic} />
                <div className="all-articles-comments-like-btns">
                  <LikeButton likes={votes} id={article_id} type="articles" />
                  <p>{comment_count} Comments </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  }
}

export default Articles;

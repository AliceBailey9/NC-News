import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";
import Loader from "./Loader";
import {
  randomImage,
  codingImages,
  cookingImages,
  footballImages,
} from "../utils";

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
          ({ article_id, author, title, created_at, topic, votes }, index) => {
            return (
              <Link
                className="article-header"
                key={article_id}
                to={`/articles/${article_id}`}
              >
                <div key={article_id} className="flexbox-item">
                  <small>{created_at}</small>
                  {topic === "coding" ? (
                    <div>
                      <img
                        className="pics"
                        src={randomImage(codingImages)}
                        alt="coding"
                      ></img>
                    </div>
                  ) : null}
                  {topic === "cooking" ? (
                    <div>
                      <img
                        className="pics"
                        src={randomImage(cookingImages)}
                        alt="cookng"
                      ></img>
                    </div>
                  ) : null}
                  {topic === "football" ? (
                    <div>
                      <img
                        className="pics"
                        src={randomImage(footballImages)}
                        alt="football"
                      ></img>
                    </div>
                  ) : null}
                  <h1>{title}</h1>
                  <h2>Author: {author}</h2>
                  <p>Likes {votes}</p>
                </div>
              </Link>
            );
          }
        )}
      </div>
    );
  }
}

export default Articles;

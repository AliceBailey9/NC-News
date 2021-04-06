import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    console.log(this.props.topic);
    getArticles(this.props.topic).then((articles) => {
      this.setState({ articles: articles });
    });
  }

  componentDidUpdate(prevProps) {
    const currentTopic = this.props.topic;
    console.log(currentTopic, "current topic");
    if (currentTopic !== prevProps.topic) {
      getArticles(currentTopic).then((articles) => {
        this.setState({ articles: articles });
      });
    }
  }

  render() {
    return (
      <main>
        <ul>
          {this.state.articles.map(
            ({ article_id, author, title, created_at, topic, votes }) => {
              return (
                <li key={article_id} className="all-articles">
                  <small>{created_at}</small>
                  <h1>
                    <Link
                      className="article-header"
                      key={article_id}
                      to={`/articles/${article_id}`}
                    >
                      {title}
                    </Link>
                  </h1>
                  <h2>Author: {author}</h2>
                  <p>{votes}</p>
                </li>
              );
            }
          )}
        </ul>
      </main>
    );
  }
}

export default Articles;

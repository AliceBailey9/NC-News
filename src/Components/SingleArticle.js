import React, { Component } from "react";
import { getArticleById } from "../api";
import Comments from "./Comments";

class SingleArticle extends Component {
  state = {
    article: [],
  };

  componentDidMount() {
    getArticleById(this.props.article_id).then((article) => {
      this.setState({ article: article });
    });
  }

  render() {
    const article = this.state.article;
    return (
      <section>
        <h1>{article.title}</h1>
        {article.body}
        <small>{article.author}</small>
        Comments
        <Comments article_id={this.props.article_id} />
      </section>
    );
  }
}

export default SingleArticle;

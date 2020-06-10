import React, { Component } from "react";
import './ArticlePost.css'

class ArticlePost extends Component {
  render() {
    return (
      <div className="article_post">
        <p>Title: {this.props.article.title}</p>
        <p>Source: {this.props.article.url}</p>
        <p>Description: {this.props.article.description}</p>
        <p>{this.props.article.created_at}</p>
      </div>
    );
  }
}

export default ArticlePost;

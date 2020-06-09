import React, { Component } from "react";

class ArticlePost extends Component {
  render() {
    return (
      <div>
        <p>{this.props.article.title}</p>
        <p>{this.props.article.description}</p>
        <p>{this.props.article.url}</p>
        <p>{this.props.article.created_at}</p> 
        <p>=========</p>
      </div>
    );
  }
}

export default ArticlePost;

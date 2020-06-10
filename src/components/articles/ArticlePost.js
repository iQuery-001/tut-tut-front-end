import React, { Component } from "react";
import "./ArticlePost.css";
import CommentsContainer from "../comments/CommentsContainer";
// import store from "./DataStore";
import Axios from "axios";

class ArticlePost extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: [],
    };
  }
  getUser = () => {
    // console.log(this.props.article.user_id);
    Axios.get(`http://localhost:3001/users/${this.props.article.user_id}`).then(
      (user) => {
        // console.log(user)
        this.setState({
          currentUser: user.data,
        });
      }
    );
    // console.log(this.state.currentUser);
  };

  componentDidMount() {
    this.getUser();
  }
  truncate = (str, num_words) => {
    return str.split(" ").splice(0, num_words).join(" ") + "...";
  };

  render() {
    return (
      <div className="article_post">
        <div onClick={() => this.props.clickHandler(this.props.article)}>
          <p>Title: {this.props.article.title}</p>
          <p>Source: {this.props.article.url}</p>
          {this.props.individualPost ? (
            <p>Decripton: {this.props.article.description}</p>
          ) : (
            <p>
              Description: {this.truncate(this.props.article.description, 75)}
            </p>
          )}
        </div>

        <span>Sourcefinder: {this.state.currentUser.email}</span>
        <span className="Timestamp"> {this.props.article.created_at} </span>
        {this.props.individualPost ? (
          <CommentsContainer
            user={this.props.user}
            article={this.props.article}
            loggedInStatus={this.props.loggedInStatus}
          ></CommentsContainer>
        ) : null}
      </div>
    );
  }
}

export default ArticlePost;

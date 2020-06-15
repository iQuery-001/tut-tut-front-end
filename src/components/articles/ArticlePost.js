import React, { Component } from "react";
// import "./ArticlePost.css";
import CommentsContainer from "../comments/CommentsContainer";
// import store from "./DataStore";
import Axios from "axios";
import '../Grid.css'

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
      <div className="post-grid-container">
        <div onClick={() => this.props.clickHandler(this.props.article)}>
          <p className="Title">Title: {this.props.article.title}</p>
          <p className="URL">Source: {this.props.article.url}</p> 
          {this.props.individualPost ? (
            <p className="Description">Decripton: {this.props.article.description}</p>
          ) : (
            <p className="Description">
              Description: {this.truncate(this.props.article.description, 25)}
            </p>
          )}
        </div>

        <div className="Sourcefinder">Sourcefinder: {this.state.currentUser.email}</div>
        <div className="Timestamp"> {this.props.article.created_at} </div>
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

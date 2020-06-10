import React, { Component } from "react";
import store from "../DataStore";
import Comment from "./Comment";
import { observer } from "mobx-react";
import Axios from "axios";
import CreateComment from "./CreateComment";

const CommentsContainer = observer(
  class CommentsContainer extends Component {
    // filterComments = () => {
    //   let filtered = store.comments.filter(
    //     (comment) => comment.article_id === this.props.article.id
    //   );
    //   console.log(store.comments)
    //   return filtered;
    // };

    populateComments = () => {
      Axios.get(`http://localhost:3001/articles/${this.props.article.id}`).then(
        (article) => {
          // console.log(article)
          store.comments = article.data.comments.reverse();
        }
      );
    };

    getNewComments = (response) => {
      store.comments = [response, ...store.comments];
    };

    componentDidMount() {
      this.populateComments();
    }
    render() {
      return (
        <div>
          {this.props.loggedInStatus === "LOGGED_IN" ? (
            <CreateComment
              user={this.props.user}
              article={this.props.article}
              getNewComments={this.getNewComments}
            ></CreateComment>
          ) : null}

          {store.comments.map((comment) => (
            <Comment user={this.props.user} key={comment.id} comment={comment}></Comment>
          ))}
        </div>
      );
    }
  }
);

export default CommentsContainer;

import React, { Component } from "react";
import store from "../DataStore";
import Comment from "./Comment";
import { observer } from "mobx-react";
import Axios from "axios";
import CreateComment from "./CreateComment";
import '../Grid.css'

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

    deleteComment = (reqComment) => {
      if (this.props.user.id === reqComment.user_id) {
        console.log(reqComment)
        store.comments = [
          ...store.comments.filter((comment) => reqComment.id !== comment.id),
        ];

        // Axios.delete(`http://localhost:3001/comments/${id}`);
        fetch(`http://localhost:3001/comments/${reqComment.id}`, {
            method: "DELETE"
        }).then(res => console.log(res));
      }
    };

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
            <Comment
              user={this.props.user}
              key={comment.id}
              comment={comment}
              getNewComments={this.getNewComments}
              deleteComment={this.deleteComment}
            ></Comment>
          ))}
        </div>
      );
    }
  }
);

export default CommentsContainer;

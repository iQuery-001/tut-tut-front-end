import React, { Component } from "react";
import "./Comment.css";
// import store from "../DataStore";
// import { observer } from "mobx-react";
import Axios from "axios";
import EditComment from "./EditComment";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: [],
    };
  }
  getUser = () => {
    console.log(this.props.comment.user_id);
    Axios.get(`http://localhost:3001/users/${this.props.comment.user_id}`).then(
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

  render() {
    return (
      <div className="Comment">
        <h4>{`${this.state.currentUser.email} says:`}</h4>
        <p>{this.props.comment.content}</p>
        <span className="Timestamp">{this.props.comment.created_at}</span>
        {this.state.currentUser.id === this.props.comment.user_id ? (
          <EditComment
            user={this.props.user}
            comment={this.props.comment}
            article={this.props.article}
          ></EditComment>
        ) : null}
      </div>
    );
  }
}

export default Comment;

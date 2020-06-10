import React, { Component } from "react";
import Axios from 'axios'

class CreateComment extends Component {
  constructor() {
    super();
    this.state = {
      content: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // console.log(this.props.user)
    event.preventDefault();
    if (
      this.state.content.length !== 0
    ) {
      Axios.post("http://localhost:3001/comments", {
        comment: {
          user_id: this.props.user.id,
          content: this.state.content,
          article_id: this.props.article.id
        },
      }).then((res) => {
        console.log(res);
        this.props.getNewComments(res.data.comment);
      });

      this.setState({
        content: ""
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="content"
            name="content"
            placeholder="Comment Content"
            value={this.state.content}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateComment;

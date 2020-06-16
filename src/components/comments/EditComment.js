import React, { Component } from 'react';
import Axios from "axios";


class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.comment.content,
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
    if (this.state.content.length !== 0 && this.props.user.id === this.props.comment.user_id) {
      Axios.patch(
        `https://peaceful-eyrie-92044.herokuapp.com/comments/${this.props.comment.id}`,
        {
          comment: {
            content: this.state.content,
          },
        }
      ).then((res) => {
        console.log(res);
        // this.props.getNewComments(res.data.comment);
      });

    //   this.setState({
    //     content: "",
    //   });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="content"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditComment;
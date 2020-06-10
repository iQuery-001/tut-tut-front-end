import React, { Component } from "react";
import Axios from 'axios'

class CreateArticle extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      url: "",
      desc: "",
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
    Axios
      .post(
        "http://localhost:3001/articles",
        {
          article: {
            user_id: this.props.user.id,
            title: this.state.title,
            url: this.state.url,
            desc: this.state.desc,
          },
        }
      ).then(res => {
          console.log(res)
          this.props.getNewArticles(res.data.article)
        })
    
    

  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="title"
            name="title"
            placeholder="Put the title of the Tutorial here"
            value={this.state.title}
            onChange={this.handleChange}
          ></input>
          <input
            type="url"
            name="url"
            placeholder="Put the url of the Tutorial here"
            value={this.state.url}
            onChange={this.handleChange}
          ></input>
          <input
            type="desc"
            name="desc"
            placeholder="Put the description of the Tutorial here"
            value={this.state.desc}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateArticle;

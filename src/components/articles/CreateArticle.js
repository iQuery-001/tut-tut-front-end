import React, { Component } from "react";
import Axios from "axios";
import "../Grid.css";

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
    if (
      this.state.title.length !== 0 &&
      this.state.url.length !== 0 &&
      this.state.desc.length !== 0
    ) {
      Axios.post("http://localhost:3001/articles", {
        article: {
          user_id: this.props.user.id,
          title: this.state.title,
          url: this.state.url,
          desc: this.state.desc,
        },
      }).then((res) => {
        console.log(res);
        this.props.getNewArticles(res.data.article);
      });

      this.setState({
        title: "",
        url: "",
        desc: "",
      });
    }
  };

  render() {
    return (
      <div className="create-article-grid-container">
        <form onSubmit={this.handleSubmit}>
          <input
            className="t_title"
            type="title"
            name="title"
            placeholder="Tutorial Title"
            value={this.state.title}
            onChange={this.handleChange}
          ></input>
          <input
            className="t_url"
            type="url"
            name="url"
            placeholder="Tutorial URL"
            value={this.state.url}
            onChange={this.handleChange}
          ></input>
          <br></br>
          <label>
            <br></br>
            <textarea
              className="t_desc"
              name="desc"
              value={this.state.desc}
              onChange={this.handleChange}
              placeholder="Tutorial Description"
            />
          </label>
          <button className="t_submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateArticle
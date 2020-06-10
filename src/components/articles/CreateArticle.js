import React, { Component } from "react";
import Axios from "axios";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="title"
            name="title"
            placeholder="Tutorial Title"
            value={this.state.title}
            onChange={this.handleChange}
          ></input>
          <input
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
              name="desc"
              value={this.state.desc}
              onChange={this.handleChange}
              placeholder="Tutorial Description"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateArticle;

{/* <label>
  Description:
  <textarea
    name={desc}
    value={this.state.desc}
    onChange={this.handleChange}
    placeholder="Tutorial Description"
  />
</label>; */}

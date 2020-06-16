import React, { Component } from "react";
import axios from "axios";
import { button } from 'semantic-ui-react'
// import JsonApi from "devour-client";

// const jsonApi = new JsonApi({ apiUrl: "http://localhost:3001" });

// jsonApi.define("registration", {
//   user: {
//     email: "",
//     password: "",
//     password_confirmation: ""
//   },
// });

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://peaceful-eyrie-92044.herokuapp.com/sessions",
        {
          user: {
            email: this.state.email,
            password: this.state.password,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res from Login: ", res);
        if (res.data.logged_in) {
          this.props.handleSuccessfulAuth(res.data);
        }
      })
      .catch((error) => {
        console.log("Login error: ", error);
        // this.setState({
        //   registrationError: error,
        // });
      });

    this.fieldReset();
    // console.log(event);
    // jsonApi.create("registration", {
    //   user: {
    //     email: this.state.email,
    //     password: this.state.password,
    //     password_confirmation: this.state.password_confirmation
    //   },
    // }).catch(errors => console.log(errors));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fieldReset = () => {
    this.setState({
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;

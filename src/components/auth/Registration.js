import React, { Component } from "react";
import Axios from "axios";
import '../Grid.css'
// import JsonApi from "devour-client";

// const jsonApi = new JsonApi({ apiUrl: "http://localhost:3001" });

// jsonApi.define("registration", {
//   user: {
//     email: "",
//     password: "",
//     password_confirmation: ""
//   },
// });

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationError: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      "https://peaceful-eyrie-92044.herokuapp.com/registrations",
      {
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        },
      },
      { withCredentials: true }
    )
      .then((res) => {
        if (res.data.status === "created") {
          this.props.handleSuccessfulAuth(res.data);
        }
      })
      .catch((error) => {
        this.setState({
          registrationError: error,
        });
      });

      // this.fieldReset();
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

  // fieldReset = () => {
  //   this.setState({
  //     email: "",
  //     password: "",
  //     password_confirmation: "",
  //   });
  // };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            className="form-input"
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;

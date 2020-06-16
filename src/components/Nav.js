import React, { Component } from "react";
import Registration from "./auth/Registration.js";
import Login from "./auth/Login.js";
import './Grid.css'

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        {this.props.loggedInStatus === "LOGGED_IN" ? (
          <div>
            <span>{this.props.user.email}</span>
            <div><button onClick={this.props.handleLogout}>Log Out</button></div>
          </div>
        ) : (
          <div>
            <Registration
              className="registration"
              handleSuccessfulAuth={this.props.handleSuccessfulAuth}
              user={this.props.user}
            />
            <Login
              className="login"
              handleSuccessfulAuth={this.props.handleSuccessfulAuth}
              user={this.props.user}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Nav;

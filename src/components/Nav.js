import React, { Component } from "react";
import Registration from "./auth/Registration.js";
import Login from "./auth/Login.js";

class Nav extends Component {
    render() {
        return (
          <React.Fragment>
              {/* Insert Logout button here and ternary it with the other frag */}
              <button onClick={this.props.handleLogout}>Log Out</button>
            <React.Fragment>
              <Registration
                handleSuccessfulAuth={this.props.handleSuccessfulAuth}
                user={this.props.user}
              />
              <Login
                handleSuccessfulAuth={this.props.handleSuccessfulAuth}
                user={this.props.user}
              />
            </React.Fragment>
          </React.Fragment>
        );
    }
}

export default Nav;
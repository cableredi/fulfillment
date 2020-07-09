import React, { Component } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import LoginForm from "../Components/LoginForm";

export default class LoginPage extends Component {
  static contextType = GlobalContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };
  state = {
    error: null,
  };

  handleLoginSuccess = () => {
    const { history } = this.props;
    console.log("login success");

    history.push("/stats");
  };

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>

        {this.state.error && <p className="error">{this.state.error}</p>}

        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </div>
    );
  }
}

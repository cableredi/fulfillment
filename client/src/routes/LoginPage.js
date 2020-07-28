import React, { Component, useState } from "react";
import LoginForm from "../Components/LoginForm";

export default function LoginPage(props) {
  const [error, setError] = useState("");
  const { history } = props;

  handleLoginSuccess = () => {
    history.push("/main");
  };

  return (
    <div className="Login">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

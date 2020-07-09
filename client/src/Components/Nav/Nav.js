import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TokenService from "../../services/token-service";
import '../../css/nav.css';

export default class Nav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <>
        <li>
          <NavLink to="/addStats">Add</NavLink>
        </li>
        <li>
          <NavLink to="/updateStats">Update</NavLink>
        </li>
        <li>
          <NavLink to="/view">View</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={this.handleLogoutClick}>
            Logout
          </NavLink>
        </li>
      </>
    );
  }

  renderLoginLink() {
    return (
      <>
        <li>
          <NavLink to="/addStats">Add</NavLink>
        </li>
        <li>
          <NavLink to="/view">View</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/registration">Register</NavLink>
        </li>
      </>
    );
  }

  render() {
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">

          <div className="toolbar__logo">
            <NavLink to="/main">
              Home
            </NavLink>
          </div>

          <div className="spacer" />

          <div className="toolbar__navigation-items">
            <ul>
              {TokenService.hasAuthToken()
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

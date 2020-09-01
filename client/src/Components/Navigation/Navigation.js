import React from "react";
import TokenService from "../../services/token-service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Navigation() {
  
  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  const renderLogoutLink = (
    <>
      <Nav.Link href="/teammembers">Team Members</Nav.Link>

      <Nav.Link href="/statistics">Add Statistics</Nav.Link>

      <Nav.Link href="/graphs">Graphs</Nav.Link>

      <Nav.Link href="/tables">Tables</Nav.Link>

      <Nav.Link href="/" onClick={() => handleLogoutClick()}>
        Logout
      </Nav.Link>
    </>
  );

  const renderLoginLink = (
    <>
      <Nav.Link href="/addStats">Add</Nav.Link>

      <Nav.Link href="/view">View</Nav.Link>

      <Nav.Link href="/login">Login</Nav.Link>
    </>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/main">Fulfillment</Navbar.Brand>

      <Navbar.Toggle aria-controls="main-nav" />

      <Navbar.Collapse id="main-nav" className="justify-content-end">
        {TokenService.hasAuthToken() ? renderLogoutLink : renderLoginLink}
      </Navbar.Collapse>
    </Navbar>
  );
}

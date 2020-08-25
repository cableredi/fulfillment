import React from "react";
import Navigation from "../Components/Navigation/Navigation";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

export default function MainPage() {
  return (
    <>
      <Navigation />
      <Container>
        <Nav variant="pills" >
          <Nav.Item>
            <Nav.Link href="/teammembers">Team members</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/statistics">Statistics</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/graphs">Graphs</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/tables">Tables</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </>
  );
}

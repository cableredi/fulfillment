import React from "react";
import Navigation from "../Components/Navigation/Navigation";
import Footer from '../Components/Footer/Footer';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

export default function MainPage() {
  return (
    <>
      <Navigation />
      
      <Container className="mt-5">
        <Card className="text-center m-auto">
          <Card.Header as="h2">Please choose an option below</Card.Header>
          <Card.Body>
            <Nav className="justify-content-center">
              <Nav.Item>
                <Nav.Link href="/teammembers">Team members</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/statistics">Add Statistics</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/graphs">Graphs</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/tables">Tables</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

import React from "react";
import LoginModalForm from "../Components/Modals/LoginModalForm";
import Footer from "../Components/Footer/Footer";
import TokenService from "../services/token-service";
import AuthApiService from "../services/auth-service";
import IdleService from "../services/idle-service";
import useToggle from "../Components/Hooks/useToggle";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Welcome() {
  const [openLogin, setOpenLogin] = useToggle(false);
  const history = useHistory();

  const logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  const handleLoginSuccess = () => {
    IdleService.setIdleCallback(() => logoutFromIdle());
    IdleService.registerIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      /* the timeout will call this callback just before the token expires */
      AuthApiService.postRefreshToken();
    });
    setOpenLogin(false);
    history.push("/main");
  };

  const handleClose = () => setOpenLogin(false);

  return (
    <>
      <Container className="mt-4">
        <Card className="text-center m-auto">
          <Card.Header as="h1">Welcome to Fulfillment</Card.Header>
          <Card.Body>
            <Button variant="primary" onClick={() => setOpenLogin()}>
              Login
            </Button>
          </Card.Body>
        </Card>
        {openLogin && (
          <Modal show={openLogin} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <LoginModalForm onLoginSuccess={() => handleLoginSuccess()} />
            </Modal.Body>
          </Modal>
        )}
      </Container>
      
      <Footer />
    </>
  );
}

import React from "react";
import LoginModalForm from "../Components/Modals/LoginModalForm";
import TokenService from "../services/token-service";
import AuthApiService from "../services/auth-service";
import IdleService from "../services/idle-service";
import useToggle from "../Components/Hooks/useToggle";
import Modal from "../Components/Modals/Modal";
import "../css/landing.css";
import { useHistory } from "react-router-dom";

export default function Welcome() {
  const [openLogin, setOpenLogin] = useToggle(false);
  const history = useHistory();

  const logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.resetState({});
    this.forceUpdate();
  };

  const handleLoginSuccess = () => {
    IdleService.setIdleCallback(() => logoutFromIdle());
    IdleService.registerIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      /* the timeout will call this callback just before the token expires */
      AuthApiService.postRefreshToken();
    });
    setOpenLogin(false);
    history.push('/main');
  };

  const handleRegisterClick = () => {
    setOpenLogin(false);
  };

  return (
    <>
      <div className="Welcome">
        <h1 className="Welcome__name">Welcome</h1>
        <div className="spacer"></div>
        <div className="Welcome__nav">
          <button onClick={() => setOpenLogin()}>Login</button>
        </div>
      </div>
      {openLogin && (
        <Modal open={openLogin} toggle={setOpenLogin}>
          <LoginModalForm
            onLoginSuccess={() => handleLoginSuccess()}
            onRegisterClick={() => handleRegisterClick()}
          />
        </Modal>
      )}
    </>
  );
}

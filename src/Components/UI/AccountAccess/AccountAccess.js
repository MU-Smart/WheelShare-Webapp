import { Modal, Form, Button } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { ErrorMessage } from '@hookform/error-message';
import "../../../Assets/CSS/Login.css";

const AccountAccessModal = ({ setOverlayLogin }) => {
  /**
   * This determines whether the login or signup screen will be shown
   * true -> login screen is shown
   * false -> signup screen is shown
   */
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Modal show={setOverlayLogin} onHide={() => setOverlayLogin(false)} centered>
      {showLogin ? (
        <LoginForm onSwitchClick={() => setShowLogin(false)} closeOverlay={() => setOverlayLogin(false)}/>
      ) : (
        <SignupForm onSwitchClick={() => setShowLogin(true)} closeOverlay={() => setOverlayLogin(false)}/>
      )}
    </Modal>
  );
};

export default AccountAccessModal;
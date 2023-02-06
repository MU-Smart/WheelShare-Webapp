import { Card, Button, Form, Row, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorMessage } from '@hookform/error-message';
import "../../Assets/CSS/Login.css";

const LoginModal = ({ setOverlayLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  /**
   * React hook form integration
   */
  const { register, formState: { errors }, handleSubmit } = useForm();

  /**
   * Function to handle the submission of the signin form
   * @param {Object} data Data that is gather from the signin form.
   */
  const onSubmit = (data) => {
    console.log(data);
    setOverlayLogin(false);
  };

  return (
    <Modal show={setOverlayLogin} onHide={() => setOverlayLogin(false)} centered>
      {showLogin ? (
        <LoginForm onSwitchClick={() => setShowLogin(false)} />
      ) : (
        <SignupForm onSwitchClick={() => setShowLogin(true)} />
      )}
    </Modal>
  );
};

const LoginForm = ({ onSwitchClick, register, errors, handleSubmit, onSubmit }) => (
  <>
    {/* login form fields */}
    <Modal.Header closeButton>
      <Modal.Title>Login Form</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary">
        Close
      </Button>
      <Button variant="primary">Login</Button>
    </Modal.Footer>
    <button onClick={onSwitchClick}>Switch to signup</button>
  </>
);

const SignupForm = ({ onSwitchClick, register, errors, handleSubmit, onSubmit }) => (
  <>
    {/* signup form fields */}
    <Modal.Header closeButton>
      <Modal.Title>Create an Account</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary">
        Close
      </Button>
      <Button variant="primary">Login</Button>
    </Modal.Footer>
    <button onClick={onSwitchClick}>Switch to login</button>
  </>
);

export default LoginModal;
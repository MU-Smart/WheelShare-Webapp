import { Card, Button, Form, Row, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../Assets/CSS/Login.css";


const LoginBox = ({ setOverlayLogin, handleCloseOverlay }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setOverlayLogin(false);
  };

  return (
    <Modal show={setOverlayLogin} onHide={() => setOverlayLogin(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login to Wheelshare</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username or Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")} />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>Login</Button>
      </Modal.Body>
      <Modal.Footer>
        <div>
          Don't have an account? Sign-up here:
          <Button variant="secondary" onClick={handleSubmit(onSubmit)}>Signup</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginBox;

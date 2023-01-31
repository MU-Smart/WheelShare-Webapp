import { Card, Button, Form, Row, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../Assets/CSS/FeedbackBox.css";

const LoginBox = ({ setOverlayLogin, handleCloseOverlay }) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        setOverlayLogin(false);
    };

    return (
        <Modal show={setOverlayLogin} onHide={setOverlayLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="Enter email" 
              {...register("email")}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password" 
              {...register("password")}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOverlayLogin(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>Login</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default LoginBox;

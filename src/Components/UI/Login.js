import { Card, Button, Form, Row, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../Assets/CSS/Login.css";


const LoginBox = ({ setOverlayLogin, handleCloseOverlay }) => {
  /**
   * React hook form integration
   */
  const { register, handleSubmit } = useForm();

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
      <Modal.Header closeButton>
        <Modal.Title>Welcome Back</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3">
          </div>
          <div className="d-grid">
            <Button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
              Sign in
            </Button>
          </div>
          <p className="forgot-password text-right mb-0 mt-1">
            Forgot <a href="#">password?</a>
          </p>
        </Form>
      </Modal.Body>
      <Modal.Footer class="text-center mb-3">
        <p className="text-right mb-0">
          New here? <a href="#">Make an account</a>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginBox;

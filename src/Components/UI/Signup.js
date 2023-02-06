import { Card, Button, Form, Row, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "../../Assets/CSS/Login.css";


const Signup = ({ setOverlaySignup, handleCloseOverlay }) => {
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
    setOverlaySignup(false);
  };

  return (
    <Modal show={setOverlaySignup} onHide={() => setOverlaySignup(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Make an Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register('email', {
                required: 'Please enter your email',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register('password', {
                required: 'Please enter your password'
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p>{message}</p>}
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
          New here? <a href="#" >Make an account</a>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;

import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const LoginForm = ({ onSwitchClick, closeOverlay }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    /**
     * Function to handle the submission of the login form
     * @param {Object} data Data that is gather from the login form.
     */
    const onSubmit = (data) => {
        closeOverlay();
        console.log(data);
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Login to Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mb-3">
                    <Form.Group>
                        <Form.Control type="hidden" value="login" {...register("submissionType")}></Form.Control>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: 'Please enter an email',
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
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Please enter a password"
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ message }) => <p>{message}</p>}
                        />
                    </Form.Group>
                </Form>
                <div className="d-grid">
                    <Button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
                        Sign in
                    </Button>
                </div>
                <p className="forgot-password text-right mb-0 mt-1">
                    Forgot <a href="#">password?</a>
                </p>
            </Modal.Body>
            <Modal.Footer class="text-center mb-3">
                New here? <a href="#" onClick={onSwitchClick}>Make an account</a>
            </Modal.Footer>
        </>
    );
};

export default LoginForm;
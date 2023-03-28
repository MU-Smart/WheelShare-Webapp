import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

/**
 * @author PJ Duimstra
 * @copyright WheelShare 2023
 * 
 * This file contains the react component LoginForm used to accomodate 
 * registrations for the WheelShare app. This component connects to the AccountAccessModal
 * component and is displayed when showLogin == true.
 * 
 * @param {boolean} onSwitchClick This function is used to update the boolean state value in showLogin
 *                      to show/hide the registration Modal content properly
 * @param {boolean} onPassClick This function is used to update the boolean state value in showPassword
 *                    which shows/hides the password recovery Modal content properly
 * @param {boolean} closeOverlay This function is used to update the boolean state value in setShowLogin
 *                     which shows/hides the AccountAccessModal overlay
 * @returns the Modal content for the login form content associated with AccountAccessModal
 */

const LoginForm = ({ onSwitchClick, onPassClick, closeOverlay }) => {
    //react-hook-form integration
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
                        <Form.Control 
                            type="hidden" 
                            value="login" 
                            {...register("submissionType")}
                        />
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
                            render={({ message }) => <p class="text-danger">{message}</p>}
                        />
                    </Form.Group>
                    <Form.Group className="mt-1">
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
                            render={({ message }) => <p class="mb-1 text-danger">{message}</p>}
                        />
                    </Form.Group>
                </Form>
                <div className="d-grid">
                    <Button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
                        Sign in
                    </Button>
                    <a class="mt-1" href="#" onClick={onPassClick}>Forgot Password?</a>
                </div>
            </Modal.Body>
            <Modal.Footer class="text-center mb-3">
                New here? <a href="#" onClick={onSwitchClick}>Make an account</a>
            </Modal.Footer>
        </>
    );
};

export default LoginForm;
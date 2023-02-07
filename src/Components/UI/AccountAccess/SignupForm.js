import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const SignupForm = ({ onSwitchClick, closeOverlay }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    /**
     * Function to handle the submission of the registration form
     * @param {Object} data Data that is gather from the registration form.
     */
    const onSubmit = (data) => {
        closeOverlay();
        console.log(data);
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Register a WheelShare Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mb-3">
                    <Form.Group>
                        <Form.Control type="hidden" value="registration" {...register("submissionType")}></Form.Control>
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
                            render={({ message }) => <p class="mb-1 text-danger">{message}</p>}
                        />
                    </Form.Group>
                    <Form.Group className="mt-1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            {...register("fName", {
                                required: "Please enter your first name"
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="fName"
                            render={({ message }) => <p class="mb-1 text-danger">{message}</p>}
                        />
                    </Form.Group>
                    <Form.Group className="mt-1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            {...register("lName", {
                                required: "Please enter your last name"
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="lName"
                            render={({ message }) => <p class="mb-1 text-danger">{message}</p>}
                        />
                    </Form.Group>
                    <Form.Group className="mt-1">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Date of Birth"
                            {...register("dob", {
                                required: "Please enter your date of birth"
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="dob"
                            render={({ message }) => <p class="mb-1 text-danger">{message}</p>}
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
                    <Form.Group className="mt-1">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            {...register("password-confirm", {
                                required: "Please confirm your password", 
                                validate: (val) => {
                                    if (watch('password') != val) {
                                      return "Your passwords do no match";
                                    }
                                  }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password-confirm"
                            render={({ message }) => <p class="mb-1 text-danger">{message}</p>}
                        />
                    </Form.Group>
                </Form>
                <div className="d-grid">
                    <Button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
                        Register Account
                    </Button>
                    <Form.Group className="mt-2">
                        {['checkbox'].map((type) => (
                            <div key={`default-${type}`}>
                                <Form.Check
                                    type={type}
                                    id={"default-${type}"}
                                    label={"I agree to WheelShare's terms of use"}
                                    {...register("tos", {
                                        required: "Please agree to WheelShare's terms of use"
                                    })}
                                />
                            </div>
                        ))}
                        <ErrorMessage
                            errors={errors}
                            name="tos"
                            render={({ message }) => <p class="mb-1 text-danger">{message}</p>}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>
            <Modal.Footer class="text-center mb-3">
                Already have an account? <a href="#" onClick={onSwitchClick}>Login</a>
            </Modal.Footer>
        </>
    );
};

export default SignupForm;
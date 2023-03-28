import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

/**
 * @author PJ Duimstra
 * @copyright WheelShare 2023
 * 
 * This file contains the react component ForgotPasswordForm used to accomodate 
 * registrations for the WheelShare app. This component connects to the AccountAccessModal
 * component and is displayed when showLogin == true && showPassword == true.
 * 
 * @param {boolean} closeOverlay This function is used to update the boolean state value in setShowLogin
 *                     which shows/hides the ForgotPasswordForm content
 * @returns the Modal content for the password recovery form associated with AccountAccessModal
 */

const ForgotPasswordForm = ({ closeOverlay }) => {
    //react-hook-form integration
    const { register, handleSubmit, formState: { errors } } = useForm();

    /**
     * Confirmation of password request being recieved by the system.
     * Displays a <p> element to show user their request has been
     * recieved and to check the email they submitted.
     * @param {Object} data 
     */
    const showConfirmation = (data) => {
        const passwordForm = document.getElementById("resetPasswordForm");
        passwordForm.innerHTML = "<div class='row'>" +
            "<p class='text-center'>A confirmation" +
            " email has been sent to the account " +
            "associated with <a href='#'>" +
            data.email + "</a>";
    }
    /**
     * Function to handle the submission of the login form
     * The form will be submitted then display a confirmation message 
     * (see showConfirmation()) to the user before returning to the login screen
     * after a timeout of 4s
     * @param {Object} data Data that is gathered from the recover form.
     */
    const onSubmit = (data) => {
        console.log(data);
        showConfirmation(data);
        setTimeout(() => {
            closeOverlay();
        }, "4000")
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mb-2" id="resetPasswordForm">
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            value="resetPassword"
                            {...register("submissionType")}
                        />
                        <Form.Label>Enter the email address associated with the account</Form.Label>
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
                    <div className="d-grid mt-3">
                        <Button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
                            Recover password
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </>
    );
}

export default ForgotPasswordForm;
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import ForgotPasswordForm from "./ForgotPassword";

/**
 * @author PJ Duimstra
 * @copyright WheelShare 2023
 * 
 * This file contains the react component AccountAccessModal used to accomodate 
 * logins, registrations, and password recovery for the WheelShare app.
 * All forms used within follow the react-hook-form framework found at: https://react-hook-form.com/
 * 
 * @param {boolean} setOverlayLogin This function is used to update the boolean state value in setShowLogin
 *                                  which shows/hides the AccountAccessModal overlay
 * @returns the Modal component to display the account access forms used to login/register/recover password
 *          for the user.
 */

const AccountAccessModal = ({ setOverlayLogin }) => {
  /**
   * This determines whether the login or signup screen will be shown
   * true -> login screen is shown
   * false -> signup screen is shown
   */
  const [showLogin, setShowLogin] = useState(true);

  /**
   * This determines whether the forgot password screen will be shown
   * true -> forgot password screen is shown
   * false -> login screen is shown
   */
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal show={setOverlayLogin} onHide={() => setOverlayLogin(false)} centered>
      {showLogin ? (
        showPassword ? (
          <ForgotPasswordForm closeOverlay={() => setShowPassword(false)}/>
        ) : (
          <LoginForm onSwitchClick={() => setShowLogin(false)} onPassClick={() => setShowPassword(true)} closeOverlay={() => setOverlayLogin(false)}/>
        )
      ) : (
        <SignupForm onSwitchClick={() => setShowLogin(true)} closeOverlay={() => setOverlayLogin(false)}/>
      )}
    </Modal>
  );
};

export default AccountAccessModal;
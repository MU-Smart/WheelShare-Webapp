import { Row, Button } from "react-bootstrap";

const DisplayProfile = ({ setOverlayLogin, handleCloseOverlay}) => {
  const loginClick = () => {
    handleCloseOverlay();
    setOverlayLogin(true);
  }

  return (
    <div id="SignIn">
      <Row>
        <Button className="Account-Button" onClick={() => loginClick()}>Log In</Button>
      </Row>
    </div>
  );
};

export default DisplayProfile;

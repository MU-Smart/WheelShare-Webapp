import { Row, Button } from "react-bootstrap";

const DisplayProfile = () => {
  return (
    <div id="SignIn">
      <Row>
        <Button className="Account-Button">Log In</Button>
      </Row>
      <Row>
        <Button className="Account-Button">Sign Up</Button>
      </Row>
    </div>
  );
};

export default DisplayProfile;

import { useCallback, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const Footer = () => {
  const [show, setShow] = useState(false);

  const handleFeedbackClick = (shouldShow) => {
    var className = show ? "Feedback Feedback-Hidden" : "Feedback";
    
  }

  return (
    <Row>
      <Col xs={4}>
        <a
          href="http://routemypath.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
      </Col>
      <Col xs={4}>
        <Button
          onClick={() => {
            let Panel = document.getElementById("Feedback");
            Panel.classList.remove("Feedback-Hidden");
          }}
        >
          Feedback
        </Button>
      </Col>
      <Col xs={4}>
        <a href="mailto:raychov@MiamiOH.edu">Contact Us</a>
      </Col>
    </Row>
  );
};

export default Footer;

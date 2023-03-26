import { Button, ButtonGroup } from "react-bootstrap";
import "Assets/CSS/UI.css";

const Footer = () => {

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="secondary"
          href="http://routemypath.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Us
        </Button>
        <Button variant="secondary">
          Feedback
        </Button>
        <Button variant="secondary">Contact Us</Button>
      </ButtonGroup>
    </>
  );
};

export default Footer;

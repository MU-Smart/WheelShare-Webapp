import { Card, Button } from "react-bootstrap";
import "Assets/CSS/UI.css";

const FeedbackBox = ({setOverlayFeedback}) => {
  return (
    <div className="overlay">
      <Card className="overlay-content">
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Leave your feedback in the space below!
        </Card.Text>
        <Button variant="primary" onClick={() => {setOverlayFeedback(false)}}>Close</Button>
      </Card.Body>
    </Card>
    </div>
  );
};

export default FeedbackBox;

import { Card, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../Assets/CSS/FeedbackBox.css";

const FeedbackBox = ({ setOverlayFeedback }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setOverlayFeedback(false);
  };

  return (
    <div className="feedback-box-overlay">
      <Card className="feedback-box-overlay-content">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Feedback Form</Form.Label>
            <Form.Control
              placeholder="Please type your feedback here"
              as="textarea"
              rows="4"
              {...register("feedback")}
            />

            <Button
              variant="primary"
              onClick={() => {
                setOverlayFeedback(false);
              }}
            >
              Close
            </Button>

            <Button
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeedbackBox;

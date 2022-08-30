import { Form, Row, Col, Button } from "react-bootstrap";

const FeedbackBox = () => {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        let Panel = document.getElementById("Feedback");
        Panel.classList.add("Feedback-Hidden");
      }}
    >
      <p className="Feedback-Title">Feedback</p>
      <textarea className="form-control Feedback-Text" rows={6} />
      <Row>
        <Col xs={6}>
          <Button
            className="Feedback-Button"
            onClick={() => {
              let Panel = document.getElementById("Feedback");
              Panel.classList.add("Feedback-Hidden");
            }}
          >
            Close
          </Button>
        </Col>
        <Col xs={6}>
          <Button type="submit" className="Feedback-Button">
            Send Feedback
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FeedbackBox;

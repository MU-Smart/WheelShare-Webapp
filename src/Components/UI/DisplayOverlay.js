import OverlayButton from "Components/UI_Components/OverlayButton";
import { Row, Col } from "react-bootstrap";

const DisplayOverlay = (props) => {
  return (
    <div id="UI-Overlay">
      <Row className="Overlay-Row">
        <Col md={6}>
          <OverlayButton id="Incline" type="inclines" map={props.map} slope={props.slope}/>
        </Col>
        <Col md={6}>
          <OverlayButton id="Surfaces" type="surfaces" map={props.map} slope={props.slope}/>
        </Col>
      </Row>
    </div>
  );
}

export default DisplayOverlay;
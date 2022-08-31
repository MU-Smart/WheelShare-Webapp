import { Form, Container, Row, Col, Button, Offcanvas } from "react-bootstrap";

const DEFAULT_SLOPE = 8.0;
const SLOPE_STEP = 0.05;
const SLOPE_MIN = 2.0;
const SLOPE_MAX = 15.0;
const EASE_DUR = 2500; // Time in MS to travel to a location
const MIN_ZOOM = 15.5; // Minimum map zoom while easing
const MAX_ZOOM = 18; // Maximum map zoom while easing

const Slider = ({slope, setSlope}) => {
  const onSlopeChange = (evt) => {
    setSlope(evt.target.value);
  }

  return (
    <>
      <label htmlFor="InclineSlider" className="Slider-Text">
        {`Current Incline Upper Limit: ${slope}%`}
      </label>
      <Row>
        <input
          id="InclineSlider"
          className="Slider"
          type="range"
          min={SLOPE_MIN}
          max={SLOPE_MAX}
          value={slope}
          step={SLOPE_STEP}
          onChange={onSlopeChange}
        />
      </Row>
    </>
  );
};

export default Slider;

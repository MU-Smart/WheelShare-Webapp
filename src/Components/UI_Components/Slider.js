import { Row } from "react-bootstrap";

const SLOPE_STEP = 0.05;
const SLOPE_MIN = 2.0;
const SLOPE_MAX = 15.0;

const Slider = ({ slope, setSlope }) => {
  const onSlopeChange = (evt) => {
    setSlope(evt.target.value);
  };

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

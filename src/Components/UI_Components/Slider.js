import { Row } from "react-bootstrap";
import Slider from "@mui/material/Slider";

import { SLOPE_STEP, SLOPE_MIN, SLOPE_MAX } from "Constants.js";

const MySlider = ({ slope, setSlope }) => {
  const onSlopeChange = (evt) => {
    setSlope(evt.target.value);
  };

  return (
    <>
      <label htmlFor="InclineSlider" className="Slider-Text">
        {`Current Incline Upper Limit: ${slope}%`}
      </label>
      <Row>
        <Slider
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

export default MySlider;

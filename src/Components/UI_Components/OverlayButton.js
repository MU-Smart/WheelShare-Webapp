import { Button } from "react-bootstrap";
import ToggleSource from "Components/Functions/ToggleSource";

const OverlayButton = (props) => {
  return (
    <Button
      className={"Overlay-Toggle-" + props.id}
      id={props.id}
      onClick={() => ToggleSource(props.type, props.map, props.slope)}
    >
      <img
        src={require("Assets/LayerStyles/" + props.id + "Icon.png")}
        alt="Map Toggle Icon"
        width="100%"
        height="100%"
        className="Overlay-Toggle-Icon"
      />
    </Button>
  );
};

export default OverlayButton;
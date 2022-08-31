import { Button, ButtonGroup } from "react-bootstrap";

const ToggleButton = () => {
  return (
    <Button
      className="Back-Arrow-Header"
      onClick={() => {
        let UI = document.getElementById("UI-Left");
        let text = document.getElementById("Back-Arrow-Text");
        if (UI.classList.contains("UI-Left-Hidden")) {
          UI.classList.remove("UI-Left-Hidden");
          text.classList.remove("Back-Arrow-Text-Flipped");
        } else {
          UI.classList.add("UI-Left-Hidden");
          text.classList.add("Back-Arrow-Text-Flipped");
        }
      }}
    >
      <p className="Back-Arrow-Text" id="Back-Arrow-Text">
        &lt;
      </p>
    </Button>
  );
};

export default ToggleButton;

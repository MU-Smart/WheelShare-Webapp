import mapboxgl from "mapbox-gl";
import pinImage from "Assets/pin.png";

import "Assets/CSS/Marker.css";

const Marker = () => {
  const args = {
    anchor: "bottom",
    pitchAlignment: "map",
    draggable: true,
  };

  const pin = document.createElement("img");
  pin.src = pinImage;

  // Create Marker with image and args
  return new mapboxgl.Marker(pin, { ...args });
}

export default Marker;

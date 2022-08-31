import mapboxgl from "mapbox-gl";
import pinImage from "Assets/pin.png";

import "Assets/CSS/Marker.css";

myMarker.propTypes = {
  name: String,
  center: Array,
};

export default function myMarker({ name, center, key }) {
  const args = {
    className: name,
    longitude: center[0],
    latitude: center[1],
    anchor: "bottom",
    key: typeof key != "undefined" ? key : name,
    pitchAlignment: "map",
    draggable: true,
  };

  // Create Image Element for marker
  const pin = document.createElement("img");
  pin.src = pinImage;

  // Create Marker with image and args
  const marker = new mapboxgl.Marker(pin, { ...args });
  return marker;
}

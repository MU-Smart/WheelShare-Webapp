import { Children, cloneElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * React component that renders a control section on a Google Map.
 * @property {string} position - The position of the control.
 * @property {Object} map - The map to add the control to.
 * @example
 * <GoogleMap>
 *   <MapControl position='TOP_LEFT'>
 *     <div>Controls</div>
 *   </MapControl>
 * </GoogleMap>
 * @example
 * <MapControl map={map} position='TOP_LEFT'>
 *   <div>Controls</div>
 * </MapControl>
 * @see https://developers.google.com/maps/documentation/javascript/reference/control
 * @see https://developers.google.com/maps/documentation/javascript/controls
 */
export function MapControl(props) {
  const controlGroup = useRef(document.createElement("div"));

  useEffect(() => {
    // Add the controls to the map.
    props.map.controls[getPosition()].push(controlGroup.current);

    return () => {
      // Remove the controls from the map.
      props.map.controls[getPosition()].pop(controlGroup.current);
    };
  }, []);

  // Convert the position prop to a Google Maps ControlPosition.
  const getPosition = () => {
    switch (props.position) {
      case "TOP_LEFT":
        return window.google.maps.ControlPosition.TOP_LEFT;
      case "TOP_RIGHT":
        return window.google.maps.ControlPosition.TOP_RIGHT;
      case "LEFT_TOP":
        return window.google.maps.ControlPosition.LEFT_TOP;
      case "RIGHT_TOP":
        return window.google.maps.ControlPosition.RIGHT_TOP;
      case "LEFT_CENTER":
        return window.google.maps.ControlPosition.LEFT_CENTER;
      case "RIGHT_CENTER":
        return window.google.maps.ControlPosition.RIGHT_CENTER;
      case "LEFT_BOTTOM":
        return window.google.maps.ControlPosition.LEFT_BOTTOM;
      case "RIGHT_BOTTOM":
        return window.google.maps.ControlPosition.RIGHT_BOTTOM;
      case "BOTTOM_LEFT":
        return window.google.maps.ControlPosition.BOTTOM_LEFT;
      case "BOTTOM_RIGHT":
        return window.google.maps.ControlPosition.BOTTOM_RIGHT;
      default:
        return window.google.maps.ControlPosition.TOP_LEFT;
    }
  };

  return createPortal(
    Children.map(props.children, (child) =>
      cloneElement(child, { map: props.map })
    ),
    controlGroup.current
  );
}

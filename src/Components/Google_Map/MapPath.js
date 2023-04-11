import { useEffect, useRef } from "react";

// React componenent that renders a line on a Google Map.
// Props: path, map, strokeColor, strokeOpacity, strokeWeight, zIndex
/**
 * React component that renders a line on a Google Map.
 * @property {Object} path - The path of the line.
 * @property {Object} map - The map to add the line to.
 * @property {string} strokeColor - The color of the line.
 * @property {number} strokeOpacity - The opacity of the line.
 * @property {number} strokeWeight - The weight of the line.
 * @property {number} zIndex - The z-index of the line.
 * @example
 * <GoogleMap>
 *  <MapPath path={path} />
 * </GoogleMap>
 * @example
 * <MapPath map={map} path={path} />
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon
 * @see https://developers.google.com/maps/documentation/javascript/shapes
 * @see https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngLiteral
 */
export function MapPath(props) {
  const line = useRef();

  useEffect(() => {
    // Create the line.
    line.current = new window.google.maps.Polyline({
      map: props.map,
      strokeColor: props.strokeColor,
      strokeOpacity: props.strokeOpacity,
      strokeWeight: props.strokeWeight,
      zIndex: props.zIndex,
    });

    return () => {
      // Remove the line from the map.
      line.current.setMap(null);
    };
  }, []);

  // Update the line path.
  useEffect(() => {
    line.current.setPath(props.path);
  }, [props.path]);

  return null;
}

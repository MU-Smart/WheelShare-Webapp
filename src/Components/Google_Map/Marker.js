import { useEffect, useRef } from "react";

/**
 * React component that renders a marker on a Google Map.
 * @property {Object} position - The position of the marker.
 * @property {string} title - The title of the marker.
 * @property {Object} map - The map to add the marker to.
 * @property {number} zIndex - The z-index of the marker.
 * @property {string} icon - The icon of the marker.
 * @property {function} callback - Callback function to handle the marker.
 * @example
 * <GoogleMap>
 *   <Marker position={{ lat: 39.51, lng: -84.73 }} title='Marker' />
 * </GoogleMap>
 * @example
 * <Marker map={map} position={{ lat: 39.51, lng: -84.73 }} title='Marker' />
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker
 * @see https://developers.google.com/maps/documentation/javascript/markers
 */
export const Marker = (props) => {
  const isInitialMount = useRef(true);
  const marker = useRef(null);

  useEffect(() => {
    // Create the marker.
    marker.current = new window.google.maps.Marker({
      map: props.map,
    });

    // Pass the marker reference to the parent.
    props.callback(marker.current);

    return () => {
      // Remove the marker from the map.
      marker.current.setMap(null);
    };
  }, []);

  useEffect(() => {
    // Update the marker.
    marker.current.setPosition(props.position);
    marker.current.setTitle(props.title);
    marker.current.setZIndex(props.zIndex || 1);
    marker.current.setIcon(props.icon);
  }, [props.position, props.title, props.zIndex, props.icon]);

  return null;
};

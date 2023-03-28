import { createRef, useEffect } from "react";

/**
 * React component that renders an autocomplete search box.
 * @property {Object} map - The map to add the search box to.
 * @property {function} callback - Callback function to handle the search box.
 * @property {string} style - The style of the search box.
 * @property {string} placeholder - The placeholder text of the search box.
 * @property {string} className - The class name of the search box.
 * @example
 * <GoogleMap>
 *   <PlaceAutocomplete callback={handlePlace} />
 * </GoogleMap>
 * @example
 * <PlaceAutocomplete map={map} callback={handlePlace} />
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
 * @see https://developers.google.com/maps/documentation/javascript/places-autocomplete
 */
export function PlaceAutocomplete(props) {
  const ref = createRef();

  useEffect(() => {
    // Check if the Google Maps Places API is loaded.
    if (window.google.maps.places) {
      // Create the autocomplete search box.
      const autocomplete = new window.google.maps.places.Autocomplete(
        ref.current
      );
      autocomplete.bindTo("bounds", props.map);

      // Listen for autocomplete selection.
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          props.callback(place);
        }
      });
    } else {
      console.error("Google Maps Places API not loaded");
    }
  }, []);

  // Render the input box.
  return (
    <input
      className={props.className || "Autocomplete"}
      id={props.id || "Autocomplete"}
      ref={ref}
      type="text"
      style={props.style || {}}
      placeholder={props.placeholder || ""}
    />
  );
}

import { createRef, useEffect, useRef, useState } from "react";

/* Google Maps API Wrapper 
This wrapper is built on top of the Google Maps API.
It provides a simple interface for creating and manipulating Google Maps objects.

The wrapper is composed of multiple React components:
- JSAPILoader: Loads the Google Maps API and renders its children after load.
- GoogleMap: Renders a Google Map and passes the map to its children.
- Marker: Attaches a marker to a Google Map.
- PlaceAutocomplete: Attaches a place autocomplete to a Google Map.
- MapControl: Attaches its children to a Google Map control section.
- MapPath: Renders a path on a Google Map.
*/

/**
 * React component that loads the Google Maps API and renders the children after the API is loaded.
 * @property {string} apiKey - The Google Maps API key.
 * @property {string} [libraries] - The Google Maps API libraries to load.
 * @property {function} onLoad - Callback function to handle the API load.
 * @property {function} onError - Callback function to handle the API load error.
 * @example
 * <JSAPILoader apiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
 *   <GoogleMap />
 * </JSAPILoader>
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 * @see https://developers.google.com/maps/documentation/javascript/libraries
 */
export const JSAPILoader = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const ref = createRef();
  const script = useRef(document.createElement("script"));

  useEffect(() => {
    attachScript();

    return () => {
      // Remove the script tag from the DOM.
      if (script.current && script.current.parentNode) {
        script.current.parentNode.removeChild(script.current);
      }
    };
  }, []);

  // Attach the Google Maps API script to the DOM.
  function attachScript() {
    // Callback function to handle the API loading.
    window.JSAPILoad = () => {
      setIsLoading(false);
      if (props.onLoad) {
        props.onLoad();
      }
    };

    // Create the script tag.
    script.current.type = "text/javascript";
    script.current.src = `https://maps.googleapis.com/maps/api/js?key=${
      props.apiKey
    }&callback=JSAPILoad${
      props.libraries ? `&libraries=${props.libraries}` : ""
    }`;
    script.current.defer = true;
    script.current.async = true;

    // Callback function to handle errors.
    if (props.onError) {
      script.addEventListener("error", () => {
        props.onError();
      });
    }

    // Attach the script tag to the DOM.
    ref.current.appendChild(script.current);
  }

  // Render chilren after the API is loaded.
  return (
    <div ref={ref}>
      <div>{isLoading ? "Loading..." : props.children}</div>
    </div>
  );
};

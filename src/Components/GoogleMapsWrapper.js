import {
  Children,
  cloneElement,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

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
export function JSAPILoader(props) {
  const [isLoading, setIsLoading] = useState(true);
  const ref = createRef();
  const script = useRef(document.createElement('script'));

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
    script.current.type = 'text/javascript';
    script.current.src = `https://maps.googleapis.com/maps/api/js?key=${
      props.apiKey
    }&callback=JSAPILoad${
      props.libraries ? `&libraries=${props.libraries}` : ''
    }`;
    script.current.defer = true;
    script.current.async = true;

    // Callback function to handle errors.
    if (props.onError) {
      script.addEventListener('error', () => {
        props.onError();
      });
    }

    // Attach the script tag to the DOM.
    ref.current.appendChild(script.current);
  }

  // Render chilren after the API is loaded.
  return (
    <div ref={ref}>
      <div>{isLoading ? 'Loading...' : props.children}</div>
    </div>
  );
}

/**
 * React component that renders a Google Map.
 * @property {string} height - The height of the map.
 * @property {string} width - The width of the map.
 * @property {Object} center - The center of the map.
 * @property {number} zoom - The zoom level of the map.
 * @property {Object} options - Other map options (Overridden by properties).
 * @property {boolean} locate - Whether to center using the user's location.
 * @property {function} onLoad - Callback function to handle the map load.
 * @example
 * <GoogleMap height='100vh' width='100vw' center={{ lat: 39.51, lng: -84.73 }} />
 * @see https://developers.google.com/maps/documentation/javascript/reference/map
 * @see https://developers.google.com/maps/documentation/javascript/adding-a-google-map
 */
export function GoogleMap(props) {
  const [isLoading, setIsLoading] = useState(true);
  const ref = createRef();
  const map = useRef();

  // Property defaults
  const default_center = { lat: 49.2827, lng: -123.1207 };
  const default_zoom = 14;

  useEffect(() => {
    // Create the map with default center and zoom if props not specified.
    const noGeolocation = () => {
      createMap(props.center || default_center, props.zoom || default_zoom);
    };

    // Set the map center to user's location if requested.
    if (props.locate && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          createMap(
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            props.zoom || default_zoom
          );
        },
        (error) => {
          console.log(`GeoLocation Error: ${error.message}`);
          noGeolocation();
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      noGeolocation();
    }
  }, []);

  // Create the Google Map instance.
  function createMap(center, zoom) {
    map.current = new window.google.maps.Map(ref.current, {
      ...props.options,
      center: center,
      zoom: zoom,
    });
    setIsLoading(false);
    if (props.onLoad) {
      props.onLoad(map.current);
    }
  }

  // Render the map and pass it to the children.
  return (
    <div>
      <div
        className={props.className || 'GoogleMap'}
        id={props.id || 'GoogleMap'}
        ref={ref}
        style={{
          height: props.height,
          width: props.width,
        }}
      ></div>
      {/* Dont display children until map is loaded */}
      {isLoading
        ? null
        : Children.map(props.children, (child) => {
            return cloneElement(child, { map: map.current });
          })}
    </div>
  );
}

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
export function Marker(props) {
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
}

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
  const controlGroup = useRef(document.createElement('div'));

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
      case 'TOP_LEFT':
        return window.google.maps.ControlPosition.TOP_LEFT;
      case 'TOP_RIGHT':
        return window.google.maps.ControlPosition.TOP_RIGHT;
      case 'LEFT_TOP':
        return window.google.maps.ControlPosition.LEFT_TOP;
      case 'RIGHT_TOP':
        return window.google.maps.ControlPosition.RIGHT_TOP;
      case 'LEFT_CENTER':
        return window.google.maps.ControlPosition.LEFT_CENTER;
      case 'RIGHT_CENTER':
        return window.google.maps.ControlPosition.RIGHT_CENTER;
      case 'LEFT_BOTTOM':
        return window.google.maps.ControlPosition.LEFT_BOTTOM;
      case 'RIGHT_BOTTOM':
        return window.google.maps.ControlPosition.RIGHT_BOTTOM;
      case 'BOTTOM_LEFT':
        return window.google.maps.ControlPosition.BOTTOM_LEFT;
      case 'BOTTOM_RIGHT':
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
      autocomplete.bindTo('bounds', props.map);

      // Listen for autocomplete selection.
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          props.callback(place);
        }
      });
    } else {
      console.error('Google Maps Places API not loaded');
    }
  }, []);

  // Render the input box.
  return (
    <input
      className={props.className || 'Autocomplete'}
      id={props.id || 'Autocomplete'}
      ref={ref}
      type='text'
      style={props.style || {}}
      placeholder={props.placeholder || ''}
    />
  );
}

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

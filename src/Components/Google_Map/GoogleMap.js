import {
  Children,
  cloneElement,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';

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
export const GoogleMap = (props) => {
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
  const createMap = (center, zoom) => {
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
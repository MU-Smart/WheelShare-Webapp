import {
  Children,
  cloneElement,
  Component,
  createElement,
  createRef,
} from 'react';

import ReactDOMServer from 'react-dom/server';

// React component that loads the Google Maps API and
// renders the children after the API is loaded.
// Props: apiKey, libraries, onLoad, onError
export class JSAPILoader extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.ref = createRef();
  }

  // Attach the Google Maps API script to the DOM.
  attachScript = () => {
    // Callback function to handle the API loading.
    window.JSAPILoad = () => {
      this.setState({ isLoading: false });
      if (this.props.onLoad) {
        this.props.onLoad();
      }
    };

    // Create the script tag.
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      this.props.apiKey
    }&callback=JSAPILoad${
      this.props.libraries ? `&libraries=${this.props.libraries}` : ''
    }}`;
    script.defer = true;
    script.async = true;

    // Callback function to handle errors.
    if (this.props.onError) {
      script.addEventListener('error', () => {
        this.props.onError();
      });
    }

    // Attach the script tag to the DOM.
    this.ref.current.appendChild(script);
  };

  componentDidMount() {
    this.attachScript();
  }

  // Render chilren after the API is loaded.
  render = () => (
    <div ref={this.ref}>
      <div>{this.state.isLoading ? 'Loading...' : this.props.children}</div>
    </div>
  );
}

// React component that renders a Google Map.
// Props: height, width, center, locate, zoom
export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.ref = createRef();
  }

  componentDidMount() {
    // Property defaults
    const default_center = { lat: 49.2827, lng: -123.1207 };
    const default_zoom = 14;

    // Create the map with default center and zoom if props not specified.
    const noGeolocation = () => {
      this.createMap(
        this.props.center || default_center,
        this.props.zoom || default_zoom
      );
    };

    // Set the map center to user's location if requested.
    if (this.props.locate && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.createMap(
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            this.props.zoom || default_zoom
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
  }

  // Create the Google Map instance.
  createMap = (center, zoom) => {
    this.map = new window.google.maps.Map(this.ref.current, {
      center: center,
      zoom: zoom,
      disableDefaultUI: true,
    });
    this.setState({ isLoading: false });
    if (this.props.callback) this.props.callback(this.map);
  };

  // Render the map and pass its reference to the children.
  render = () => (
    <div>
      <div
        id='map'
        ref={this.ref}
        style={{
          height: this.props.height,
          width: this.props.width,
        }}
      ></div>
      {/* Dont display markers until map is loaded */}
      {this.state.isLoading
        ? null
        : Children.map(this.props.children, (child) => {
            return cloneElement(child, { map: this.map });
          })}
    </div>
  );
}

// React component that renders a marker on a Google Map.
// Props: position, title, map, zIndex
export class Marker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Create the marker.
    this.marker = new window.google.maps.Marker({
      position: this.props.position,
      map: this.props.map,
      title: this.props.title,
      zIndex: this.props.zIndex,
    });
  }

  render = () => null;
}

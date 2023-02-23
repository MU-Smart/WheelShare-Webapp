import { Children, cloneElement, Component, createRef } from 'react';
import { createPortal } from 'react-dom';

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

// React component that renders a control section on a Google Map.
// Props: position, map
export class MapControl extends Component {
  constructor(props) {
    super(props);
    this.controlGroup = document.createElement('div');
  }

  componentDidMount() {
    // Convert the position prop to a Google Maps ControlPosition.
    const getPosition = () => {
      switch (this.props.position) {
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
        case 'BOTTOM_CENTER':
          return window.google.maps.ControlPosition.BOTTOM_CENTER;
        case 'BOTTOM_LEFT':
          return window.google.maps.ControlPosition.BOTTOM_LEFT;
        case 'BOTTOM_RIGHT':
          return window.google.maps.ControlPosition.BOTTOM_RIGHT;
        default:
          return window.google.maps.ControlPosition.TOP_CENTER;
      }
    };

    // Add the control group to the map.
    this.props.map.controls[getPosition()].push(this.controlGroup);
  }

  // Pass the children to the control group.
  render = () => createPortal(this.props.children, this.controlGroup);
}

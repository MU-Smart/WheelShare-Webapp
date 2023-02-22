import { Children, cloneElement, Component, createRef } from 'react';

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
// Props: height, width
export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    // Create the Google Map instance.
    this.map = new window.google.maps.Map(this.ref.current, {
      center: { lat: 49.2827, lng: -123.1207 },
      zoom: 14,
      disableDefaultUI: true,
      mapTypeId: 'terrain',
    });

    // Set the map to the user's location with HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map.setCenter(pos);
      });
    }
  }

  // Render the map and pass its reference to the children.
  render() {
    return (
      <div>
        <div
          id='map'
          ref={this.ref}
          style={{
            height: this.props.height,
            width: this.props.width,
          }}
        ></div>
        {Children.map(this.props.children, (child) => {
          return cloneElement(child, { map: this.map });
        })}
      </div>
    );
  }
}

// React component that renders a marker on a Google Map.
// Props: position, title, map
export class Marker extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    // Create the marker.
    this.marker = new window.google.maps.Marker({
      position: this.props.position,
      map: this.props.map,
      title: this.props.title,
    });
  }

  // Render the marker.
  render() {
    return (
      <div ref={this.ref}>
        <p>{this.props.map}</p>
      </div>
    );
  }
}

import { Component } from 'react';
import { MapControl, MapPath, Marker } from 'Components/GoogleMapsWrapper';
import SearchPanel from './SearchPanel';

export default class ControlUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeFrom: null,
      placeTo: null,
      path: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.placeFrom !== prevState.placeFrom ||
      this.state.placeTo !== prevState.placeTo
    ) {
      this.setState({ path: this.getPath() });
    }
  }

  getPath = () => {
    return [
      this.state.placeFrom?.geometry.location,
      this.state.placeTo?.geometry.location,
    ];
  };

  render = () => (
    <>
      {/* Path between placeFrom and placeTo */}
      <MapPath map={this.props.map} path={this.state.path} />
      {/* Marker for placeFrom */}
      <Marker
        title='From'
        icon={{
          url: 'http://maps.google.com/mapfiles/ms/icons/green.png',
        }}
        map={this.props.map}
        position={{
          lat: this.state.placeFrom?.geometry.location.lat(),
          lng: this.state.placeFrom?.geometry.location.lng(),
        }}
        callback={(marker) => {
          marker.addListener('click', () => {
            this.props.map.panTo(marker.getPosition());
            this.props.map.setZoom(15);
          });
        }}
      />
      {/* Marker for placeTo */}
      <Marker
        title='To'
        icon={{
          url: 'http://maps.google.com/mapfiles/ms/icons/red.png',
        }}
        map={this.props.map}
        position={{
          lat: this.state.placeTo?.geometry.location.lat(),
          lng: this.state.placeTo?.geometry.location.lng(),
        }}
        callback={(marker) => {
          marker.addListener('click', () => {
            this.props.map.panTo(marker.getPosition());
            this.props.map.setZoom(15);
          });
        }}
      />
      {/* Search panel */}
      <MapControl map={this.props.map} position='TOP_LEFT'>
        <SearchPanel
          callback={({ placeFrom, placeTo }) => {
            this.setState({ placeFrom, placeTo });
          }}
        />
      </MapControl>
      {/* Overlay toggles */}
      <MapControl map={this.props.map} position='TOP_RIGHT'>
        <div>
          <h1>Overlay toggles</h1>
        </div>
      </MapControl>
    </>
  );
}

import { Component } from 'react';
import { PlaceAutocomplete } from 'Components/GoogleMapsWrapper';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeFrom: null,
      placeTo: null,
      show: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.placeFrom !== prevState.placeFrom ||
      this.state.placeTo !== prevState.placeTo
    ) {
      this.props.callback({
        placeFrom: this.state.placeFrom,
        placeTo: this.state.placeTo,
      });
    }
  }

  render = () => (
    <>
      {/* Control section */}
      <div
        style={{
          margin: '10px',
          position: 'relative',
          display: this.state.show ? 'block' : 'none',
        }}
      >
        <div className='card-header'>
          <button
            className='clean-input close'
            onClick={() => this.setState({ show: !this.state.show })}
          >
            X
          </button>
          <h1
            style={{
              textAlign: 'center',
              margin: '15px',
            }}
          >
            Map Controls
          </h1>
        </div>
        <div className='card-body'>
          <PlaceAutocomplete
            className='clean-input shadow-inset'
            map={this.props.map}
            callback={(place) => {
              this.setState({ placeFrom: place });
              this.props.map.panTo(place.geometry.location);
              this.props.map.setZoom(15);
            }}
            placeholder='From'
          />
          <PlaceAutocomplete
            className='clean-input shadow-inset'
            map={this.props.map}
            callback={(place) => {
              this.setState({ placeTo: place });
              this.props.map.panTo(place.geometry.location);
              this.props.map.setZoom(15);
            }}
            placeholder='To'
          />
          <button
            className='clean-input shadow'
            onClick={() => {
              console.log('Calculate Path');
              console.log(
                'placeFrom',
                this.state.placeFrom?.geometry.location.lat(),
                this.state.placeFrom?.geometry.location.lng()
              );
              console.log(
                'placeTo',
                this.state.placeTo?.geometry.location.lat(),
                this.state.placeTo?.geometry.location.lng()
              );
            }}
          >
            Calculate Path
          </button>
        </div>
      </div>
      {/* Control toggle */}
      <div
        style={{
          margin: '10px',
          display: this.state.show ? 'none' : 'block',
        }}
      >
        <button
          style={{
            boxShadow: '0 1px 5px 1px grey',
          }}
          className='clean-input'
          onClick={() => this.setState({ show: !this.state.show })}
        >
          <h3
            style={{
              margin: '0px',
            }}
          >
            View Controls
          </h3>
        </button>
      </div>
    </>
  );
}

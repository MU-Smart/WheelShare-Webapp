import { useEffect, useState } from 'react';
import { PlaceAutocomplete } from 'Components/GoogleMapsWrapper';

export default function SearchPanel(props) {
  const [placeFrom, setPlaceFrom] = useState(null);
  const [placeTo, setPlaceTo] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.callback({ placeFrom, placeTo });
  }, [placeFrom, placeTo]);

  return (
    <>
      {/* Control section */}
      <div
        style={{
          margin: '10px',
          position: 'relative',
          display: show ? 'block' : 'none',
        }}
      >
        <div className='card-header'>
          <button className='clean-input close' onClick={() => setShow(!show)}>
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
            map={props.map}
            callback={(place) => {
              setPlaceFrom(place);
              props.map.panTo(place.geometry.location);
              props.map.setZoom(15);
            }}
            placeholder='From'
          />
          <PlaceAutocomplete
            className='clean-input shadow-inset'
            map={props.map}
            callback={(place) => {
              setPlaceTo(place);
              props.map.panTo(place.geometry.location);
              props.map.setZoom(15);
            }}
            placeholder='To'
          />
          <button
            className='clean-input shadow'
            onClick={() => {
              console.log('Calculate Path');
              console.log(
                'placeFrom',
                state.placeFrom?.geometry.location.lat(),
                state.placeFrom?.geometry.location.lng()
              );
              console.log(
                'placeTo',
                state.placeTo?.geometry.location.lat(),
                state.placeTo?.geometry.location.lng()
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
          display: show ? 'none' : 'block',
        }}
      >
        <button
          style={{
            boxShadow: '0 1px 5px 1px grey',
          }}
          className='clean-input'
          onClick={() => setShow(!show)}
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

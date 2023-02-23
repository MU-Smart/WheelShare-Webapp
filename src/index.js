import { MapControl, PlaceAutocomplete } from 'Components/GoogleMapsWrapper';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { JSAPILoader, GoogleMap } from './Components/GoogleMapsWrapper';

function Root() {
  // TODO: Move to separte files
  const [map, setMap] = React.useState(null);
  const [placeFrom, setPlaceFrom] = React.useState(null);
  const [placeTo, setPlaceTo] = React.useState(null);

  document.body.style.margin = 0;

  return (
    <JSAPILoader
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <GoogleMap
        height='100vh'
        width='100vw'
        center={{ lat: 39.51, lng: -84.73 }}
        callback={(m) => setMap(m)}
      >
        <MapControl position='TOP_LEFT'>
          <div style={{ margin: '10px' }}>
            <div
              style={{
                background: 'lightgrey',
                width: '350px',
                padding: '15px',
                borderRadius: '10px 10px 0 0',
                boxShadow: '0 1px 5px 1px grey',
                position: 'relative',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  margin: '15px',
                }}
              >
                Map Controls
              </h1>
            </div>
            <div
              style={{
                background: 'white',
                width: '350px',
                padding: '15px',
                paddingTop: '20px',
                borderRadius: '0 0 10px 10px',
                boxShadow: '0 1px 5px 1px grey',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '25px',
                }}
              >
                <PlaceAutocomplete
                  style={{
                    padding: '10px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    border: 'none',
                    borderRadius: '32px',
                    boxShadow: 'inset 0 0 3px 0 grey',
                  }}
                  map={map}
                  callback={setPlaceFrom}
                  placeholder='From'
                />
                <PlaceAutocomplete
                  style={{
                    padding: '10px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    border: 'none',
                    borderRadius: '32px',
                    boxShadow: 'inset 0 0 3px 0 grey',
                  }}
                  map={map}
                  callback={setPlaceTo}
                  placeholder='To'
                />
                <button
                  style={{
                    padding: '10px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    border: 'none',
                    borderRadius: '32px',
                    boxShadow: '0 0 3px 0 grey',
                  }}
                  onClick={() => {
                    console.log('Calculate Path');
                    console.log(
                      'placeFrom',
                      placeFrom?.geometry.location.lat(),
                      placeFrom?.geometry.location.lng()
                    );
                    console.log(
                      'placeTo',
                      placeTo?.geometry.location.lat(),
                      placeTo?.geometry.location.lng()
                    );
                  }}
                >
                  Calculate Path
                </button>
              </div>
            </div>
          </div>
        </MapControl>
      </GoogleMap>
    </JSAPILoader>
  );
}

const root = createRoot(
  document.body.appendChild(document.createElement('div'))
);
root.render(<Root />);

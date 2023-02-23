import { MapControl, Marker } from 'Components/GoogleMapsWrapper';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { JSAPILoader, GoogleMap } from './Components/GoogleMapsWrapper';

function Root() {
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
      />
    </JSAPILoader>
  );
}

const root = createRoot(
  document.body.appendChild(document.createElement('div'))
);
root.render(<Root />);

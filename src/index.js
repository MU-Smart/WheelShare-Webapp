import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MapProvider } from 'react-map-gl';

import { JSAPILoader, GoogleMap } from './Components/GoogleMapsWrapper';

import Map from './Components/Map/Map';
import UI from './Components/UI/UI';

function Root() {
  return (
    <JSAPILoader
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <GoogleMap height='500px' width='100%' />
    </JSAPILoader>
    // <MapProvider>
    //   <Map />
    //   <UI />
    // </MapProvider>
  );
}

const root = createRoot(
  document.body.appendChild(document.createElement('div'))
);
root.render(<Root />);

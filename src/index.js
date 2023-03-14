import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { JSAPILoader, GoogleMap, MapPath } from './Components/GoogleMapsWrapper';

import 'Assets/CSS/GoogleMap.css';
import ControlUI from 'Components/UI/ControlUI';
import { getPath } from 'Components/Functions/Path';

function Root() {
  document.body.style.margin = 0;

  // TODO - Add overlay and toggles
  // TODO - Add incline preference
  // TODO - Add routing display
  // TODO - Add data to url paramenters

  const updateURLCoords = (lat, lng) => {
    const params = new URLSearchParams(window.location.search);
    params.set('lat', lat);
    params.set('lng', lng);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const updateURLZoom = (zoom) => {
    const params = new URLSearchParams(window.location.search);
    params.set('zoom', zoom);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const coords = [{lat: 39.5078013, lng: -84.7349985}, {lat: 39.5075956, lng: -84.7348137}, {lat: 39.5073334, lng: -84.7346021}, {lat: 39.5073326, lng: -84.7345406}, {lat: 39.5073315, lng: -84.7344776}, {lat: 39.5073722, lng: -84.7344314}, {lat: 39.5075803, lng: -84.7341949}];
  


  return (
    <JSAPILoader
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <GoogleMap
        height='100vh'
        width='100vw'
        center={{
          lat:
            Number(new URLSearchParams(window.location.search).get('lat')) ||
            39.51,
          lng:
            Number(new URLSearchParams(window.location.search).get('lng')) ||
            -84.73,
        }}
        zoom={
          Number(new URLSearchParams(window.location.search).get('zoom')) || 20
        }
        options={{
          disableDefaultUI: true,
        }}
        onLoad={(map) => {
          map.addListener('center_changed', () => {
            updateURLCoords(
              map.getCenter().lat().toFixed(4),
              map.getCenter().lng().toFixed(4)
            );
          });
          map.addListener('zoom_changed', () => {
            updateURLZoom(map.getZoom());
          });
        }}
      >
        <ControlUI />
        <MapPath path={coords}/>
      </GoogleMap>
      
    </JSAPILoader>
  );
}

const root = createRoot(
  document.body.appendChild(document.createElement('div'))
);
root.render(<Root />);

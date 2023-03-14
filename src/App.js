import { GoogleMap } from 'Components/Google_Map/GoogleMap.js';
import { JSAPILoader } from './Components/Google_Map/JSAPILoader.js';
import { Marker } from 'Components/Google_Map/Marker.js';

import 'App.css';
import { useEffect, useState } from 'react';
import { MapPath } from 'Components/Google_Map/MapPath.js';
import { ToggleGoogleSource } from 'Components/Functions/ToggleSource.js';
import { PlaceAutocomplete } from 'Components/Google_Map/PlaceAutoComplete.js';

export const App = () => {
  document.body.style.margin = 0;

  // TODO - Add overlay and toggles
  // TODO - Add incline preference
  // TODO - Add routing display
  // TODO - Add data to url paramenters

  const [mapRef, setMapRef] = useState(null);
  const [placeFrom, setPlaceFrom] = useState(null);
  const [placeTo, setPlaceTo] = useState(null);
  const [path, setPath] = useState(null);
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  useEffect(() => {
    setPath(getPath());
  }, [placeFrom, placeTo]);

  const getPath = () => {
    if (!placeFrom || !placeTo) return null;
    return [placeFrom?.geometry.location, placeTo?.geometry.location];
  };

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

  return (
    <>
      {/* Navbar */}
      <div className='navbar h-16 bg-base-100'>
        {/* Search toggle */}
        <div className='navbar-start'>
          <button
            className='btn btn-sm btn-primary'
            onClick={() => setShowSearchPanel(!showSearchPanel)}
          >
            <h3>Toggle Search</h3>
          </button>
        </div>
        <div className='navbar-center prose'>
          <h2>MyPath</h2>
        </div>
        {/* Overlay toggles */}
        <div className='navbar-end gap-2'>
          <button
            className='btn btn-sm btn-primary'
            onClick={() => {
              ToggleGoogleSource('surfaces', mapRef, 1);
            }}
          >
            Overlay 1
          </button>
          <button
            className='btn btn-sm btn-primary'
            onClick={() => {
              ToggleGoogleSource('surfaces', mapRef, 1);
            }}
          >
            Overlay 2
          </button>
          <button
            className='btn btn-sm btn-primary'
            onClick={() => {
              ToggleGoogleSource('surfaces', mapRef, 1);
            }}
          >
            Overlay 3
          </button>
        </div>
      </div>
      <JSAPILoader
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
      >
        <GoogleMap
          height='calc(100vh - 4rem)'
          width='100vw'
          center={{
            lat:
              Number(new URLSearchParams(window.location.search).get('lat')) ||
              39.5055,
            lng:
              Number(new URLSearchParams(window.location.search).get('lng')) ||
              -84.7354,
          }}
          zoom={
            Number(new URLSearchParams(window.location.search).get('zoom')) ||
            14
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
            setMapRef(map);
          }}
        >
          {/* FOR PATRICK: Place path objects here! */}
          {/* Path between placeFrom and placeTo */}
          {!path ? null : <MapPath path={path} />}
          {/* Marker for placeFrom */}
          {!placeFrom ? null : (
            <Marker
              title='From'
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/green.png',
              }}
              position={{
                lat: placeFrom?.geometry.location.lat(),
                lng: placeFrom?.geometry.location.lng(),
              }}
              callback={(marker) => {
                marker.addListener('click', () => {
                  mapRef.panTo(marker.getPosition());
                  mapRef.setZoom(15);
                });
              }}
            />
          )}
          {/* Marker for placeTo */}
          {!placeTo ? null : (
            <Marker
              title='To'
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red.png',
              }}
              position={{
                lat: placeTo?.geometry.location.lat(),
                lng: placeTo?.geometry.location.lng(),
              }}
              callback={(marker) => {
                marker.addListener('click', () => {
                  mapRef.panTo(marker.getPosition());
                  mapRef.setZoom(15);
                });
              }}
            />
          )}
        </GoogleMap>
      </JSAPILoader>
      {/* Search Panel UI */}
      {!mapRef ? null : (
        <div
          className={
            'absolute left-8 top-24 card bg-base-100 bg-opacity-90' +
            (showSearchPanel ? ' flex' : ' hidden')
          }
        >
          <div className='card-body gap-4'>
            {/* Place from */}
            <PlaceAutocomplete
              className='input input-bordered input-primary'
              map={mapRef}
              callback={(place) => {
                setPlaceFrom(place);
                mapRef.panTo(place.geometry.location);
                mapRef.setZoom(15);
              }}
              placeholder='From'
            />
            {/* Place to */}
            <PlaceAutocomplete
              className='input input-bordered input-primary'
              map={mapRef}
              callback={(place) => {
                setPlaceTo(place);
                mapRef.panTo(place.geometry.location);
                mapRef.setZoom(15);
              }}
              placeholder='To'
            />
            {/* Search button */}
            <div className='card-actions justify-center mt-4'>
              <button
                className='btn btn-primary'
                onClick={() => {
                  console.log('Calculating Path');
                }}
              >
                Calculate Path
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

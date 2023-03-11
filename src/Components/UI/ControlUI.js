import { MapControl } from 'Components/Google_Map/MapControl';
import { MapPath } from 'Components/Google_Map/MapPath';
import { Marker } from 'Components/Google_Map/Marker';

import { useEffect, useState } from 'react';
import SearchPanel from './SearchPanel';

export const ControlUI = (props) => {
  const [placeFrom, setPlaceFrom] = useState(null);
  const [placeTo, setPlaceTo] = useState(null);
  const [path, setPath] = useState(null);
  console.log(props.map);

  useEffect(() => {
    setPath(getPath());
  }, [placeFrom, placeTo]);

  const getPath = () => {
    if (!placeFrom || !placeTo) return null;
    return [placeFrom?.geometry.location, placeTo?.geometry.location];
  };

  return (
    <>
      {/* Path between placeFrom and placeTo */}
      {!path ? null : <MapPath map={props.map} path={path} />}
      {/* Marker for placeFrom */}
      {!placeFrom ? null : (
        <Marker
          title='From'
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/green.png',
          }}
          map={props.map}
          position={{
            lat: placeFrom?.geometry.location.lat(),
            lng: placeFrom?.geometry.location.lng(),
          }}
          callback={(marker) => {
            marker.addListener('click', () => {
              props.map.panTo(marker.getPosition());
              props.map.setZoom(15);
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
          map={props.map}
          position={{
            lat: placeTo?.geometry.location.lat(),
            lng: placeTo?.geometry.location.lng(),
          }}
          callback={(marker) => {
            marker.addListener('click', () => {
              props.map.panTo(marker.getPosition());
              props.map.setZoom(15);
            });
          }}
        />
      )}
      {/* Search panel */}
    </>
  );
}

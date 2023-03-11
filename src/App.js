import { GoogleMap } from "Components/Google_Map/GoogleMap.js";
import { JSAPILoader } from "./Components/Google_Map/JSAPILoader.js";
import { ControlUI } from "Components/UI/ControlUI.js";
import { MapControl } from "Components/Google_Map/MapControl.js";
import { SearchPanel } from "Components/UI/SearchPanel.js";

import "Assets/CSS/GoogleMap.css";
import { useState } from "react";

export const App = () => {
  document.body.style.margin = 0;
  const [mapRef, setMapRef] = useState(null);

  // TODO - Add overlay and toggles
  // TODO - Add incline preference
  // TODO - Add routing display
  // TODO - Add data to url paramenters

  const updateURLCoords = (lat, lng) => {
    const params = new URLSearchParams(window.location.search);
    params.set("lat", lat);
    params.set("lng", lng);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const updateURLZoom = (zoom) => {
    const params = new URLSearchParams(window.location.search);
    params.set("zoom", zoom);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <JSAPILoader
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        height="90vh"
        width="100vw"
        center={{
          lat:
            Number(new URLSearchParams(window.location.search).get("lat")) ||
            39.5055,
          lng:
            Number(new URLSearchParams(window.location.search).get("lng")) ||
            -84.7354,
        }}
        zoom={
          Number(new URLSearchParams(window.location.search).get("zoom")) || 16
        }
        options={{
          disableDefaultUI: true,
        }}
        onLoad={(map) => {
          map.addListener("center_changed", () => {
            updateURLCoords(
              map.getCenter().lat().toFixed(4),
              map.getCenter().lng().toFixed(4)
            );
          });
          map.addListener("zoom_changed", () => {
            updateURLZoom(map.getZoom());
          });
          setMapRef(map);
        }}
      ></GoogleMap>
      {mapRef === null ? (
        <></>
      ) : (
        <>
          <MapControl map={mapRef} position="TOP_LEFT">
            <SearchPanel callback={() => {}}/>
          </MapControl>
          {/* Overlay toggles */}
          <MapControl map={mapRef} position="TOP_RIGHT">
            <div>
              <h1>Overlay toggles</h1>
            </div>
          </MapControl>
          {/* <ControlUI map={mapRef} /> */}
        </>
      )}
    </JSAPILoader>
  );
};

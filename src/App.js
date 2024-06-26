import { GoogleMap } from "Components/Google_Map/GoogleMap.js";
import { JSAPILoader } from "./Components/Google_Map/JSAPILoader.js";
import { Marker } from "Components/Google_Map/Marker.js";

import "App.css";
import { useState } from "react";
import { MapPath } from "Components/Google_Map/MapPath.js";
import Footer from "Components/UI_Components/Footer.js";
import NavBar from "Components/UI_Components/NavBar.js";
import SearchPanel from "Components/UI_Components/SearchPanels.js";
import SignUpForm from "Components/UI_Components/SignUpForm.js";
import LoginForm from "Components/UI_Components/LoginForm.js";
import LayerControl from "Components/UI_Components/LayerControl.js";
import { MAPS_API_KEY } from "Constants.js";

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
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showSignUpOverlay, setShowSignUpOverlay] = useState(false);

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
    <>
    {showLoginOverlay && <LoginForm setShowLoginOverlay={setShowLoginOverlay} setShowSignUpOverlay={setShowSignUpOverlay}/>}
    {showSignUpOverlay && <SignUpForm setShowLoginOverlay={setShowLoginOverlay} setShowSignUpOverlay={setShowSignUpOverlay}/>}
    {mapRef && <LayerControl mapRef={mapRef}/>}
    
    <>
      {/* Navigation bar */}
      <NavBar
        mapRef={mapRef}
        showSearchPanelx={showSearchPanel}
        setShowSearchPanel={setShowSearchPanel}
        setShowLoginOverlay={setShowLoginOverlay}
        setShowSignUpOverlay={setShowSignUpOverlay}
      />

      {/* Custom JS Loader */}
      <JSAPILoader
        apiKey={MAPS_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          height="calc(100vh - 4rem)"
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
            Number(new URLSearchParams(window.location.search).get("zoom")) ||
            14
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
        >
          {/* FOR PATRICK: Place path objects here! */}
          {/* Path between placeFrom and placeTo */}
          {!path ? null : <MapPath path={path} strokeColor={"#4a8af7"} strokeWeight={8}/>}
          {/* Marker for placeFrom */}
          {!placeFrom ? null : (
            <Marker
              title="From"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green.png",
              }}
              position={{
                lat: placeFrom?.geometry.location.lat(),
                lng: placeFrom?.geometry.location.lng(),
              }}
              callback={(marker) => {
                marker.addListener("click", () => {
                  mapRef.panTo(marker.getPosition());
                  mapRef.setZoom(15);
                });
              }}
            />
          )}
          {/* Marker for placeTo */}
          {!placeTo ? null : (
            <Marker
              title="To"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red.png",
              }}
              position={{
                lat: placeTo?.geometry.location.lat(),
                lng: placeTo?.geometry.location.lng(),
              }}
              callback={(marker) => {
                marker.addListener("click", () => {
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
        <SearchPanel
          mapRef={mapRef}
          placeFrom={placeFrom}
          setPlaceFrom={setPlaceFrom}
          placeTo={placeTo}
          setPlaceTo={setPlaceTo}
          setPath={setPath}
          showSearchPanel={showSearchPanel}
        />
      )}
      <Footer />
    </>
    </>
  );
};

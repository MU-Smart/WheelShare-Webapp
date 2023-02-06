import * as React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useMap } from "react-map-gl";
import axios from "axios";

import { DEFAULT_SLOPE } from "Constants.js";
import ToggleSource from "Components/Functions/ToggleSource";
import DisplayOverlay from "./DisplayOverlay";
import DisplayProfile from "./DisplayProfile";
import LoginModal from "./Login";
import Footer from "Components/UI_Components/Footer";
import FeedbackBox from "Components/UI_Components/FeedbackBox";
import Slider from "Components/UI_Components/Slider";
import SearchBar from "Components/UI_Components/SearchBar";
import Marker from "Components/UI_Components/Marker";


import "bootstrap/dist/css/bootstrap.min.css";
import "Assets/CSS/UI.css";
import "Assets/CSS/MapTypes.css";
import "Assets/CSS/Footer.css";
import "Assets/CSS/Profile.css";
import "Assets/CSS/Slider.css";
import "Assets/CSS/Searchbar.css";

/**
 * Initation of markers and addresses.
 * We need these global variables for the form in the child components Offcanvas
 * Offcanvas will unmount on hidden, causing changes made in the form to be lost
 * => These will serve as memories variables so we can reload the Offcanvas
 * with necessary information when mount again.
 * * Only addresses needs to be updated when changed to keep the addresses most up to date
 * * when the OffCanvas mount
 * * The marker will only be updated when submit
 */
let startMarker = Marker();
let startAddress = null;
let endMarker = Marker();
let endAddress = null;

export default function Controls() {
  const { mymap } = useMap();
  const [slope, setSlope] = useState(DEFAULT_SLOPE);

  const [overlayFeedback, setOverlayFeedback] = useState(false);
  const [overlayLogin, setOverlayLogin] = useState(false);
  const [overlaySignup, setOverlaySignup] = useState(false);
  const [overlayForgotPassword, setOverlayForgotPassword] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleShowOverlay = () => {
    setShowOverlay(true);
  };

  //  ======= Helper Functions ======= \\
  /**
   * Function to validate an address string
   * @param {*} address the address to be checked
   * @returns true if address is valid, false otherwise
   */
  const checkValidAddress = (address) => {
    return address !== null && address.length > 0;
  };

  /**
   * Ease the zoom on the map
   * If there are 2 markers => Ease zoom to fit all 2 markers
   * If there is only 1 => Ease zoom to center that marker
   * @returns
   */
  const zoomEase = () => {
    if (
      startMarker.getLngLat() !== undefined &&
      endMarker.getLngLat() !== undefined
    ) {
      mymap.fitBounds([startMarker.getLngLat(), endMarker.getLngLat()], {
        padding: 100,
        duration: 1000,
      });
      return;
    }

    if (startMarker.getLngLat() !== undefined) {
      mymap.easeTo({
        center: startMarker.getLngLat(),
        zoom: 15,
        duration: 1000,
      });
    }

    if (endMarker.getLngLat() !== undefined) {
      mymap.easeTo({
        center: endMarker.getLngLat(),
        zoom: 15,
        duration: 1000,
      });
    }
  };

  /**
   * Search for the coordinate associated with an address,
   * then update the marker accordingly
   * @param {*} address the address string to be looked up
   * @param {*} isStart start or end. true if start, false if end.
   * @returns
   */
  const geocode = async (address, isStart) => {
    if (!checkValidAddress(address)) {
      if (isStart) {
        startMarker.remove();
        startMarker = Marker();
      } else {
        endMarker.remove();
        endMarker = Marker();
      }
      zoomEase();
      return;
    }

    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json";
    axios({
      method: "get",
      url: url,
      params: {
        access_token: process.env.REACT_APP_TOKEN,
        limit: 1,
      },
    })
      .then(async (res) => {
        let center = res.data.features[0].center;
        if (center !== undefined) {
          updateMarker(center, isStart);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Update the marker position on the map.
   * First remove the marker, update its coordinate and add it again.
   * @param {*} coordinates coordinate to update the marker
   * @param {*} isStart start or end. true if start, false if end.
   */
  const updateMarker = (coordinates, isStart) => {
    if (coordinates.length === 0) {
      return
    }

    if (isStart) {
      startMarker.remove();
      startMarker.setLngLat(coordinates);
      startMarker.addTo(mymap.getMap());
    }
    if (!isStart) {
      endMarker.remove();
      endMarker.setLngLat(coordinates);
      endMarker.addTo(mymap.getMap());
    }
    zoomEase();
  };

  /**
   * Global function to update the global addresses
   * @param {*} address address to be updated
   * @param {*} isStart start or end. true if start, false if end.
   */
  const updateAddress = (address, isStart) => {
    if (isStart) {
      startAddress = address;
    } else {
      endAddress = address;
    }
  };

  useEffect(() => {
    ToggleSource("slopeChange", mymap, slope);
  }, [slope]);

  //  ======= Return ======= \\
  return (
    <>
      {overlayFeedback && (
        <FeedbackBox setOverlayFeedback={setOverlayFeedback} />
      )}

      {overlayLogin && (
        <LoginModal setOverlayLogin={setOverlayLogin} />
      )}

      <DisplayOverlay map={mymap} slope={slope} />

      <Button id="Overlay-button" variant="primary" onClick={handleShowOverlay}>
        Search Bar
      </Button>

      <Offcanvas
        id="Offcanvas"
        className="Offcanvas"
        show={showOverlay}
        onHide={handleCloseOverlay}
      >
        <div id="Offcanvas-Title">MyPath</div>

        <div id="UI-Content">
          <div id="Searchbar">
            <SearchBar
              geocode={geocode}
              startMarker={startMarker}
              endMarker={endMarker}
              updateMarker={updateMarker}
              startAddress={startAddress}
              endAddress={endAddress}
              updateAddress={updateAddress}
            />
          </div>

          <div id="Slider">
            <Slider slope={slope} setSlope={setSlope} />
          </div>

          <div id="Profile">
            <DisplayProfile
              setOverlayLogin={setOverlayLogin}
              handleCloseOverlay={handleCloseOverlay}
            />
          </div>

          <div id="Footer">
            <Footer
              setOverlayFeedback={setOverlayFeedback}
              handleCloseOverlay={handleCloseOverlay}
            />
          </div>
        </div>
      </Offcanvas>
    </>
  );
}

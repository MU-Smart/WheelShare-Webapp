import * as React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useMap } from "react-map-gl";
import axios from "axios";

import { DEFAULT_SLOPE } from "Constants.js";
import ToggleSource from "Components/Functions/ToggleSource";
import DisplayOverlay from "./DisplayOverlay";
import DisplayProfile from "./DisplayProfile";
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

const startMarker = Marker();
let startAddress = null;
const endMarker = Marker();
let endAddress = null;

export default function Controls() {
  const { mymap } = useMap();
  const [slope, setSlope] = useState(DEFAULT_SLOPE);

  const [overlayFeedback, setOverlayFeedback] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleShowOverlay = () => {
    setShowOverlay(true);
  };

  const checkValidAddress = (address) => {
    return address !== null && address.length > 2;
  };

  const zoomEase = () => {
    if (
      startMarker.getLngLat() !== undefined &&
      endMarker.getLngLat() !== undefined
    ) {
      mymap.fitBounds([startMarker.getLngLat(), endMarker.getLngLat()], {
        padding: 100, duration: 1000
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
        zoom: 9,
        duration: 1000,
      });
    }
  };

  // Requests coordinates for Address provided
  const geocode = async (address, isStart) => {
    if (!checkValidAddress(address)) {
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
        console.log(err);
      });
  };

  const updateMarker = (coordinates, isStart) => {
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

  const updateAddress = (address, isStart) => {
    if (isStart === 0) {
      startAddress = address;
    }
    if (isStart === 1) {
      endAddress = address;
    }
  }

  useEffect(() => {
    ToggleSource("slopeChange", mymap, slope);
  }, [slope]);

  //  ======= Return ======= \\
  return (
    <>
      {overlayFeedback && (
        <FeedbackBox setOverlayFeedback={setOverlayFeedback} />
      )}

      <DisplayOverlay map={mymap} slope={slope} />

      <Button id="overlay-button" variant="primary" onClick={handleShowOverlay}>
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
            <SearchBar geocode={geocode} updateMarker={updateMarker} startAddress={startAddress} endAddress={endAddress} updateAddress={updateAddress}/>
          </div>

          <div id="Slider">
            <Slider slope={slope} setSlope={setSlope} />
          </div>

          <div id="Profile">
            <DisplayProfile />
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

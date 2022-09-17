import * as React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useMap } from "react-map-gl";
import axios from "axios";
import mapboxgl from "mapbox-gl";

import ToggleSource from "Components/Functions/ToggleSource";
import DisplayOverlay from "./DisplayOverlay";
import DisplayProfile from "./DisplayProfile";
import Footer from "Components/UI_Components/Footer";
import FeedbackBox from "Components/UI_Components/FeedbackBox";
import Slider from "Components/UI_Components/Slider";
import SearchBar from "Components/UI_Components/SearchBar";
import MyMarker from "Components/UI_Components/Marker";

import "bootstrap/dist/css/bootstrap.min.css";
import "Assets/CSS/UI.css";
import "Assets/CSS/MapTypes.css";
import "Assets/CSS/Footer.css";
import "Assets/CSS/Profile.css";
import "Assets/CSS/Slider.css";
import "Assets/CSS/Searchbar.css";

import { DEFAULT_SLOPE, EASE_DUR, MIN_ZOOM, MAX_ZOOM } from "Constants.js";

export default function Controls() {
  const { mymap } = useMap();
  const [slope, setSlope] = useState(DEFAULT_SLOPE);

  const [overlayFeedback, setOverlayFeedback] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [startMarker, setStartMarker] = useState(
    MyMarker({
      name: "Start Address",
      center: new mapboxgl.LngLat(0, 0),
    })
  );

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleShowOverlay = () => {
    setShowOverlay(true);
  };

  const endMarker = MyMarker({
    name: "End Address",
    center: new mapboxgl.LngLat(0, 0),
  });

  // ===== Helper Methods ===== \\
  const checkValidAddress = (address) => {
    return address !== null && address.length > 2;
  };

  const easeTo = (props) => {
    // get maps current zoom
    const mapZoom = mymap.getMap().getZoom();

    // makes sure map zoom stays within MIN and MAX values
    const setZoom = Math.max(Math.min(mapZoom, MAX_ZOOM), MIN_ZOOM);

    mymap.easeTo({ center: props.center, duration: EASE_DUR, zoom: setZoom });
  };

  // Requests coordinates for Address provided
  const geocode = async (address, startOrEnd) => {
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
        access_token:
          "pk.eyJ1Ijoibmljb2thc3oiLCJhIjoiY2t6MjE2NXprMDF4czJ2b21uZjhqOXlhaCJ9.pzhG-dabniu4rtlDnkIVjw",
        limit: 5,
      },
    })
      .then(async (res) => {
        let center = res.data.features[0].center;
        if (center !== undefined) {
          updateMarker(startOrEnd, center);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateMarker = (startOrEnd, coordinates) => {
    if (startOrEnd == 0) {
      startMarker.remove();
      startMarker.setLngLat(coordinates);
      startMarker.addTo(mymap.getMap());
      easeTo({ center: startMarker.getLngLat() });
    } else {
      endMarker.remove();
      endMarker.setLngLat(coordinates);
      endMarker.addTo(mymap.getMap());
      easeTo({ center: endMarker.getLngLat() });
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
            <SearchBar geocode={geocode} updateMarker={updateMarker}/>
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

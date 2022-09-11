import * as React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import { useMap } from "react-map-gl";
import { routeStyle } from "Assets/LayerStyles/routeStyle.ts";

import ToggleSource from "Components/Functions/ToggleSource";
import DisplayOverlay from "./DisplayOverlay";
import DisplayProfile from "./DisplayProfile";
import Footer from "Components/UI_Components/Footer";
import FeedbackBox from "Components/UI_Components/FeedbackBox";
import Slider from "Components/UI_Components/Slider";
import SearchBar from "Components/UI_Components/SearchBar";

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

  const handleCloseOverlay = () => setShowOverlay(false);
  const handleShowOverlay = () => setShowOverlay(true);

  // ===== Helper Methods ===== \\
  const checkValidAddress = (address) => {
    return address !== null && address.length > 2;
  };

  const easeTo = useCallback(
    (props) => {
      // get maps current zoom
      const mapZoom = mymap.getMap().getZoom();

      // makes sure map zoom stays within MIN and MAX values
      const setZoom = Math.max(Math.min(mapZoom, MAX_ZOOM), MIN_ZOOM);

      mymap.easeTo({ center: props.center, duration: EASE_DUR, zoom: setZoom });
    },
    [mymap]
  );

  // Requests coordinates for Address provided
  const geocode = useCallback(
    (address, marker) => {
      if (!checkValidAddress(address)) {
        return;
      }

      fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          encodeURIComponent(address) + ".json?access_token=" + 
          process.env.REACT_APP_TOKEN + "&limit=1"
      )
        .then((resp) => resp.json())
        .then((json) => {
          // Just incase
          let center = json.features[0].center;
          if (center !== undefined) {
            marker.remove(mymap.getMap());
            marker.setLngLat(center);
            marker.addTo(mymap.getMap());
            easeTo({ center: marker.getLngLat() });
          }
        });
    },
    [easeTo, mymap]
  );

  const GetRoute = () => {
    const Source = {
      lon: "0",
      lat: "0",
    };

    const Dest = {
      lon: "0",
      lat: "0",
    };

    const routeArgs = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      redirect: "follow",
      body: JSON.stringify({
        source: Source,
        dest: Dest,
      }),
    };

    fetch(
      "http://testing.mypath.routemypath.com:8000/api/v1/direction",
      routeArgs
    )
      .then((resp) => resp.json())
      .then((json) => {
        console.log(JSON.stringify(json));
        const jsonSource = {
          type: "FeatureCollection",
          features: json,
        };
        // Adds retrieved route to map sources
        if (mymap.getMap().getSource("route") !== undefined) {
          mymap.getMap().removeLayer("routeStyle");
          mymap.getMap().removeSource("route");
        }
        // Adding new route and styles to map sources
        mymap.getMap().addSource("route", {
          type: "geojson",
          data: jsonSource,
        });
        mymap.getMap().addLayer(routeStyle);
      });
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

      <DisplayOverlay map={mymap} slope={slope} />

      <Button id="overlay-button" variant="primary" onClick={handleShowOverlay} onMouseEnter={handleShowOverlay}>
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
          <SearchBar GetRoute={GetRoute} geocode={geocode} />

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

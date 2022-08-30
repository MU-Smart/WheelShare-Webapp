import * as React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useCallback, useState } from "react";
import { useMap } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { routeStyle } from "Assets/LayerStyles/routeStyle.ts";

import ToggleSource from "Components/Functions/ToggleSource";
import DisplayOverlay from "./DisplayOverlay";
import DisplayProfile from "./DisplayProfile";
import MyMarker from "Components/Marker";

import "bootstrap/dist/css/bootstrap.min.css";
import "Assets/CSS/UI.css";
import "Assets/CSS/MapTypes.css";

const DEFAULT_SLOPE = 8.0;
const SLOPE_STEP = 0.05;
const SLOPE_MIN = 2.0;
const SLOPE_MAX = 15.0;
const EASE_DUR = 2500; // Time in MS to travel to a location
const MIN_ZOOM = 15.5; // Minimum map zoom while easing
const MAX_ZOOM = 18; // Maximum map zoom while easing

const sidewalkData = require("Assets/sidewalk.geojson");

export default function Controls() {
  const { mymap } = useMap();

  const [account, setAccount] = useState(null);
  const [slope, setSlope] = useState(DEFAULT_SLOPE);
  const [route, setRoute] = useState(null);

  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");

  const startMarker = MyMarker({
    name: "Start Address",
    center: new mapboxgl.LngLat(0, 0),
  });
  const endMarker = MyMarker({
    name: "End Address",
    center: new mapboxgl.LngLat(0, 0),
  });

  // ===== Helper Methods ===== \\
  const checkValidAddress = (input) => {
    return input !== null && input.length > 2;
  };

  const easeTo = useCallback(
    (props) => {
      // get maps current zoom
      const mapZoom = mymap.getMap().getZoom();

      // makes sure map zoom stays within MIN and MAX values
      const setZoom = Math.max(Math.min(mapZoom, MAX_ZOOM), MIN_ZOOM);

      // TODO - IMPLEMENT METHOD THAT TAKES BOTH PARAMS INTO ACCOUNT
      /*
      //  XOR of check valid start/end location
      if (Boolean(startAddress) ^ Boolean(endAddress)) {
        mymap.easeTo({
          center: startCheck ? [startLoc] : [endLoc],
          duration: EASE_DUR,
        });
      } else {
        mymap.easeTo({
          center: startLoc - endLoc,
          zoom: mymap.fitScreenCoordinates(startLoc, endLoc, 0),
          duration: EASE_DUR,
        });
      }*/
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

      const args = {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: address,
      };

      fetch(
        "http://testing.mypath.routemypath.com:8000/api/v1/external/address",
        args
      )
        .then((resp) => resp.json())
        .then((json) => {
          // Just incase
          if (json.center !== undefined) {
            marker.remove(mymap.getMap());
            marker.setLngLat(json.center);
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
      lat: "0"
    }

    const Dest = {
      lon: "0",
      lat: "0"
    }

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
          type: 'geojson',
          data: jsonSource,
        });
        mymap.getMap().addLayer(routeStyle);
      });
  };

  // TODO: REWRITE THIS LOGIC -> IT CAN BE SIMPLIFIED
  /*
    Handles: 
      Change in slope  -> rerender slopemap if active
      Toggle SlopeMap  -> toggle layer 
      Toggle SurfaceMap-> toggle layer
  */

  React.useEffect(() => {
    ToggleSource("slopeChange", mymap, slope);
  }, [slope]);

  React.useEffect(() => {
    console.log(route);
  }, [route]);

  // ======= UI Handlers ======= \\
  const onChangeStart = useCallback((evt) => {
    setStartAddress(evt.target.value);
  }, []);

  const onChangeEnd = useCallback((evt) => {
    setEndAddress(evt.target.value);
  }, []);

  const swapInputs = useCallback(() => {
    const temp = startAddress;
    setStartAddress(endAddress);
    setEndAddress(temp);
  }, [startAddress, endAddress]);

  const onSubmit = useCallback(
    (evt) => {
      GetRoute();

      evt.preventDefault();

      geocode(startAddress, startMarker);
      geocode(endAddress, endMarker);
    },
    [endAddress, endMarker, geocode, startAddress, startMarker]
  );

  const onSlopeChange = useCallback((evt) => {
    setSlope(evt.target.value);
  }, []);


  //  ======= Return ======= \\
  return (
    <>
      <DisplayOverlay map={mymap} slope={slope}/>

      <div id="UI">
        <div id="UI-Left" className="UI-Left">
          <div id="UI-Title">MyPath</div>
          <div id="UI-Content">
            <Container>
              <Form onSubmit={onSubmit}>
                <div id="Search-Area">
                  <Row>
                    <Col md={8}>
                      <input
                        type="text"
                        className="form-control UI-Search"
                        id="startLocation"
                        placeholder="Starting point"
                        onChange={onChangeStart}
                        value={startAddress || ""}
                      />
                    </Col>
                    <Col md={4}>
                      <Button className="UI-Submit" onClick={swapInputs}>
                        Swap
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <input
                        type="text"
                        className="form-control UI-Search"
                        id="endLocation"
                        placeholder="Ending point"
                        onChange={onChangeEnd}
                        value={endAddress || ""}
                      />
                    </Col>
                    <Col md={4}>
                      <input
                        type="submit"
                        className="btn-primary UI-Submit"
                        value="Search"
                      />
                    </Col>
                  </Row>
                </div>
              </Form>
            </Container>
            <div id="Slider">
              <label htmlFor="InclineSlider" className="Slider-Text">
                {`Current Incline Upper Limit: ${slope}%`}
              </label>
              <Row>
                <input
                  id="InclineSlider"
                  className="Slider"
                  type="range"
                  min={SLOPE_MIN}
                  max={SLOPE_MAX}
                  value={slope}
                  step={SLOPE_STEP}
                  onChange={onSlopeChange}
                />
              </Row>
            </div>

            <div id="Profile">
              <DisplayProfile />
            </div>

            <div id="Footer-Info">
              <Row>
                <Col xs={4}>
                  <a
                    href="http://routemypath.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    About
                  </a>
                </Col>
                <Col xs={4}>
                  <Button
                    onClick={() => {
                      let Panel = document.getElementById("Feedback");
                      Panel.classList.remove("Feedback-Hidden");                     
                    }}
                  >
                    Feedback
                  </Button>
                </Col>
                <Col xs={4}>
                  <a href="mailto:raychov@MiamiOH.edu">Contact Us</a>
                </Col>
              </Row>
            </div>
          </div>
          <Button
            className="Back-Arrow-Header"
            onClick={() => {
              let UI = document.getElementById("UI-Left");
              let text = document.getElementById("Back-Arrow-Text");
              if (UI.classList.contains("UI-Left-Hidden")) {
                UI.classList.remove("UI-Left-Hidden");
                text.classList.remove("Back-Arrow-Text-Flipped");
              } else {
                UI.classList.add("UI-Left-Hidden");
                text.classList.add("Back-Arrow-Text-Flipped");
              }
            }}
          >
            <p className="Back-Arrow-Text" id="Back-Arrow-Text">
              &lt;
            </p>
          </Button>
          <div id="Feedback" className="Feedback Feedback-Hidden">
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                console.log(event.target[0].value);
                let Panel = document.getElementById("Feedback");
                Panel.classList.add("Feedback-Hidden");
              }}
            >
              <p className="Feedback-Title">Feedback</p>
              <textarea className="form-control Feedback-Text" rows={6} />
              <Row>
                <Col xs={6}>
                  <Button
                    className="Feedback-Button"
                    onClick={() => {
                      let Panel = document.getElementById("Feedback");
                      Panel.classList.add("Feedback-Hidden");
                    }}
                  >
                    Close
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button type="submit" className="Feedback-Button">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

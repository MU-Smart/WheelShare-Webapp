import * as React from "react";
import Map from "react-map-gl";
import { TOKEN, MAPSTYLE } from "Components/constants";

import "mapbox-gl/dist/mapbox-gl.css";
import "Assets/CSS/Map.css";

// Fix for Babel transpiling bug
import mapboxgl from "mapbox-gl"; 
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const viewport = {
  width: "100vw",
  height: "100vh",
  hash: true,
  latitude: 39.50882818527073,
  longitude: -84.73455522976074,
  zoom: 17,
  maxZoom: 20,
  minPitch: 0,
  maxPitch: 30,
};

const settings = {
  dragPan: true,
  dragRotate: false,
  scrollZoom: true,
  touchZoom: false,
  touchRotate: false,
  keyboard: true,
  doubleClickZoom: false,
};


// TODO - CONSIDER: using MapBoxGL Map instead of reactmapgl map
export default function MapView() {
  return (
    <Map
      id="mymap"
      initialViewState={viewport}
      {...settings}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={MAPSTYLE}
      mapboxAccessToken={TOKEN}
      onResize={() => {
        viewport.height = window.innerHeight;
        viewport.width = window.innerWidth;
      }}
    />
  );
}

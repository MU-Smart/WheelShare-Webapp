import * as React from "react";
import { createRoot } from "react-dom/client";
import { MapProvider } from "react-map-gl";

import Map from "./Components/Map/Map";
import UI from "./Components/UI/UI";

function Root() {
  return (
    <MapProvider>
      <Map />
      <UI />
    </MapProvider>
  );
}

const root = createRoot(
  document.body.appendChild(document.createElement("div"))
);
root.render(<Root />);

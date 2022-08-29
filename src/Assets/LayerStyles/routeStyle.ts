const MIN_ZOOM_LEVEL = 14;
const MAX_ZOOM_LEVEL = 22;
const ZOOM_INTERP = [15, 1, 16, 1.6, 18, 6];

export const routeStyle = {
  id: "routeStyle",
  type: "line",
  source: "route",
  minzoom: MIN_ZOOM_LEVEL,
  "line-cap": "round",
  "line-blur": ["interpolate", ["linear"], ["zoom"], ...ZOOM_INTERP],
  filter: ["all", ["==", ["geometry-type"], "LineString"]],
  paint: {
    // Add if statement for stairs
    "line-color": "rgb(0,0,0)",  // black
    "line-width": ["interpolate", ["linear"], ["zoom"], ...ZOOM_INTERP],
  },
};

const MIN_ZOOM_LEVEL = 14;
const MAX_ZOOM_LEVEL = 22;
const ZOOM_INTERP = [15, 1, 16, 1.6, 18, 6];


export const inclineMap = (slope: string) => {
  const slopeVal = parseFloat(slope);
  const UPPER_LIMIT = slopeVal * 1.25;

  return {
    id: "inclineMap",
    type: "line",
    source: "sidewalk",
    minzoom: MIN_ZOOM_LEVEL,
    "line-cap": "round",
    "line-blur": ["interpolate", ["linear"], ["zoom"], ...ZOOM_INTERP],
    filter: [
      "all",
      ["==", ["geometry-type"], "LineString"],
      ['!=', ["get", "slope"], ["get", "incline"]]
    ],
    paint: {
      // Add if statement for stairs
      "line-color": [
        "interpolate",
        ["linear"],
        [
          "+",
          ["to-number", ["get", "slope"]],
          ["to-number", ["get", "incline"]],
        ],
        0,
        "rgb(0,255,0)",
        slopeVal,
        "rgb(180,150,100)",
        UPPER_LIMIT,
        "rgb(255,0,0)",
      ],
      "line-width": ["interpolate", ["linear"], ["zoom"], ...ZOOM_INTERP],
    },
  };
};

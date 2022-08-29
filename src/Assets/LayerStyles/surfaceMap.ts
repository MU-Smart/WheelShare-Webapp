const MIN_ZOOM_LEVEL = 14;
const MAX_ZOOM_LEVEL = 22;
const ZOOM_INTERP = [15, 1, 16, 1.6, 18, 6];

// ALL Surfaces
const Surfaces = [
  'concrete',       //0
  'paved', 
  'asphalt', 
  'paving_stones', 
  'cobblestone', 
  'bricks'          //5
];

//Colors
const Colors = [
  "rgb(150, 150, 150)",   // concrete - Grey
  "rgb(150, 150, 150)",   // paved    - Grey
  "rgb(0, 0, 0)",         // asphalt  - Black
  "rgb(100, 100, 100)",   // paving st- Dark Grey
  "rgb(255, 150, 150)",   // cobble st- Red-Pale
  "rgb(230, 130, 50)",    // brick    - TBD

]

const DEFAULT_COLOR = 'rgba(200, 90, 90, .5)' // DEFAULT  - Red?

export const surfaceMap = {
  id: "surfaceMap",
  type: "line",
  source: "sidewalk",
  minzoom: MIN_ZOOM_LEVEL,
  "line-cap": "round",
  "line-blur": ["interpolate", ["linear"], ["zoom"], ...ZOOM_INTERP],
  filter: [
    "all",
    ["==", ["geometry-type"], "LineString"],
    //["match", ["get", "surface"], ["all", SURFACES], true, false],
  ],
  paint: {
    // Add if statement for stairs
    "line-color": [
      "case",
      ["boolean", ["==", ["get", "surface"], Surfaces[0]], true],
      Colors[0],
      ["boolean", ["==", ["get", "surface"], Surfaces[1]], true],
      Colors[1],
      ["boolean", ["==", ["get", "surface"], Surfaces[2]], true],
      Colors[2],
      ["boolean", ["==", ["get", "surface"], Surfaces[3]], true],
      Colors[3],
      ["boolean", ["==", ["get", "surface"], Surfaces[4]], true],
      Colors[4],
      ["boolean", ["==", ["get", "surface"], Surfaces[5]], true],
      Colors[5],
      DEFAULT_COLOR
    ],
    "line-width": ["interpolate", ["linear"], ["zoom"], ...ZOOM_INTERP],
  },
};

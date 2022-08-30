import { inclineMap } from "Assets/LayerStyles/inclineMap.ts";
import { surfaceMap } from "Assets/LayerStyles/surfaceMap.ts";

const sidewalkData = require("Assets/sidewalk.geojson");


const ToggleSource = (type, mymap, slope) => {
  if (mymap) {
    // Add Sidewalk data to the map (only occurs first time)
    if (mymap.getMap().getSource("sidewalk") === undefined)
      mymap.getMap().addSource("sidewalk", {
        type: "geojson",
        data: sidewalkData,
      });

    switch (type) {
      case "slopeChange": {
        // Could try to use mymap.getMap().setLayoutProperty()
        if (mymap.getMap().getLayer("inclineMap") !== undefined) {
          mymap.getMap().removeLayer("inclineMap");
          mymap.getMap().addLayer(inclineMap(slope));
        }
        break;
      }

      case "inclines": {
        if (mymap.getMap().getLayer("inclineMap") === undefined) {
          mymap.getMap().addLayer(inclineMap(slope));
        } else {
          mymap.getMap().removeLayer("inclineMap");
        }
        break;
      }

      case "surfaces": {
        if (mymap.getMap().getLayer("surfaceMap") === undefined) {
          mymap.getMap().addLayer(surfaceMap);
        } else {
          mymap.getMap().removeLayer("surfaceMap");
        }
        break;
      }
      default: {
        console.error(`Invalid Layer type: ${type}`);
      }
    }
  }
}

export default ToggleSource;

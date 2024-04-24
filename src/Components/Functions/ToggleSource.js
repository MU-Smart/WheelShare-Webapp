export const surfaceColor = {
  "concrete": "rgb(150, 150, 150)",
  "paved": "rgb(150, 150, 150)",
  "asphalt": "black",
  "paving_stones": "rgb(100, 100, 100)",
  "cobble_stones": "rgb(255, 150, 150)",
  "bricks": "rgb(230, 130, 50)"
}

const sidewalkData = require('Assets/sidewalk.json');

// Load Google Map Layers from GeoJSON
const ToggleGoogleSource = (type, gmap, slope, activeLayer) => {
  const hideLayer = () => {
    if (gmap.data) {
      gmap.data.setStyle(function(feature) {
        return ({
          strokeOpacity: 0,
          fillOpacity: 0,
        });
      });
    }
  }

  if (gmap.data) {

    // Add Sidewalk data to the map (only occurs first time)
    switch (type) {
      case 'initialize': {
        gmap.data.addGeoJson(sidewalkData);
        hideLayer();
        break;
      }

      case 'slopeChange': {
        if (activeLayer === 'incline') {
          gmap.data.setStyle(function(feature) {
            var incline = feature.getProperty('incline');
            var color = "rgb(180,150,100)";
            if (incline !== undefined) {
              color = parseFloat(incline) <= slope ? 'green' : 'red';
            }
            return ({
              strokeColor: color,
              strokeOpacity: 1,
              fillOpacity: 0,
              strokeWeight: 2
            });
          });
        }
        break;
      }

      case 'incline': {
        if (activeLayer !== 'incline') {
          gmap.data.setStyle(function(feature) {
            var incline = feature.getProperty('incline');
            var color = "rgb(180,150,100)";
            if (incline !== undefined) {
              color = parseFloat(incline) <= slope ? 'green' : 'red';
            }
            return ({
              strokeColor: color,
              strokeOpacity: 1,
              fillOpacity: 0,
              strokeWeight: 2
            });
          });
        } else {
          hideLayer();
        }
        break;
      }

      case 'surfaces': {
        if (activeLayer !== 'surfaces') {
          gmap.data.setStyle(function(feature) {
            var color = surfaceColor[feature.getProperty("surface")];
            return ({
              strokeColor: color,
              strokeOpacity: (color === undefined ? 0 : 1),
              // strokeOpacity: 1,
              fillOpacity: 0,
              strokeWeight: 2
            });
          });
        } else {
          hideLayer();
        }
        break;
      }
      default: {
        console.error(`Invalid Layer type: ${type}`);
      }
    }
  }
};

// export default ToggleSource;
export { ToggleGoogleSource };

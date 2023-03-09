import { inclineMap } from 'Assets/LayerStyles/inclineMap.ts';
import { surfaceMap } from 'Assets/LayerStyles/surfaceMap.ts';

const sidewalkData = require('Assets/sidewalk.geojson');

// TODO: REWRITE THIS LOGIC -> IT CAN BE SIMPLIFIED
/*
    Handles: 
      Change in slope  -> rerender slopemap if active
      Toggle SlopeMap  -> toggle layer 
      Toggle SurfaceMap-> toggle layer
*/

const ToggleSource = (type, mymap, slope) => {
  if (mymap) {
    // Add Sidewalk data to the map (only occurs first time)
    if (mymap.getMap().getSource('sidewalk') === undefined)
      mymap.getMap().addSource('sidewalk', {
        type: 'geojson',
        data: sidewalkData,
      });

    switch (type) {
      case 'slopeChange': {
        // Could try to use mymap.getMap().setLayoutProperty()
        if (mymap.getMap().getLayer('inclineMap') !== undefined) {
          mymap.getMap().removeLayer('inclineMap');
          mymap.getMap().addLayer(inclineMap(slope));
        }
        break;
      }

      case 'inclines': {
        if (mymap.getMap().getLayer('inclineMap') === undefined) {
          mymap.getMap().addLayer(inclineMap(slope));
        } else {
          mymap.getMap().removeLayer('inclineMap');
        }
        break;
      }

      case 'surfaces': {
        if (mymap.getMap().getLayer('surfaceMap') === undefined) {
          mymap.getMap().addLayer(surfaceMap);
        } else {
          mymap.getMap().removeLayer('surfaceMap');
        }
        break;
      }
      default: {
        console.error(`Invalid Layer type: ${type}`);
      }
    }
  }
};

// Load Google Map Layers from GeoJSON
const ToggleGoogleSource = (type, gmap, slope) => {
  if (gmap.data) {
    // Add Sidewalk data to the map (only occurs first time)
    if (gmap.data.getFeatureById('sidewalk') === undefined) {
      gmap.data.loadGeoJson('Assets/sidewalk.geojson');
    }

    switch (type) {
      case 'slopeChange': {
        if (gmap.data.getFeatureById('inclineMap') !== undefined) {
          gmap.data.remove(gmap.data.getFeatureById('inclineMap'));
          gmap.data.addGeoJson(inclineMap(slope));
        }
        break;
      }

      case 'inclines': {
        if (gmap.data.getFeatureById('inclineMap') === undefined) {
          gmap.data.addGeoJson(inclineMap(slope));
        } else {
          gmap.data.remove(gmap.data.getFeatureById('inclineMap'));
        }
        break;
      }

      case 'surfaces': {
        if (gmap.data.getFeatureById('surfaceMap') === undefined) {
          gmap.data.addGeoJson(surfaceMap);
        } else {
          gmap.data.remove(gmap.data.getFeatureById('surfaceMap'));
        }
        break;
      }
      default: {
        console.error(`Invalid Layer type: ${type}`);
      }
    }
  }
};

export default ToggleSource;
export { ToggleGoogleSource };

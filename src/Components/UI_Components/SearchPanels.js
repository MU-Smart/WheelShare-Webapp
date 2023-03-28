import "App.css";
import { useEffect } from "react";
import { PlaceAutocomplete } from "Components/Google_Map/PlaceAutoComplete.js";
import { getPath } from "Components/Functions/Path.js";

const SearchPanel = (props) => {
  useEffect(() => {
    if (props.placeFrom && props.placeTo) {
      updatePath();
    }
  }, [props.placeFrom, props.placeTo]);

  async function updatePath() {
    props.setPath(
      await getPath(
        "/api/testRoute"
        // `/api/getSingleRoute?srcLat=${placeFrom?.geometry.location.lat()}&srcLon=${placeFrom?.geometry.location.lng()}&destLat=${placeTo?.geometry.location.lat()}&destLon=${placeTo?.geometry.location.lng()}`
      )
    );
  }

  return (
    <>
      <div
        className={
          "absolute left-8 top-24 card bg-base-100 bg-opacity-90 font-mono" +
          (props.showSearchPanel ? " flex" : " hidden")
        }
      >
        <div className="card-body gap-4">
          {/* Place from */}
          <PlaceAutocomplete
            className="input input-bordered input-primary"
            map={props.mapRef}
            callback={(place) => {
              props.setPlaceFrom(place);
              props.mapRef.panTo(place.geometry.location);
              props.mapRef.setZoom(15);
            }}
            placeholder="From"
          />
          {/* Place to */}
          <PlaceAutocomplete
            className="input input-bordered input-primary"
            map={props.mapRef}
            callback={(place) => {
              props.setPlaceTo(place);
              props.mapRef.panTo(place.geometry.location);
              props.mapRef.setZoom(15);
            }}
            placeholder="To"
          />
          {/* Search button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log("Calculating Path");
                if (props.placeFrom && props.placeTo) {
                  updatePath();
                }
              }}
            >
              Calculate Path
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;

import "App.css";
import { PlaceAutocomplete } from "Components/Google_Map/PlaceAutoComplete.js";

const SearchPanel = (props) => {
  return (
    <>
      <div
        className={
          "absolute left-8 top-24 card bg-base-100 bg-opacity-90" +
          (showSearchPanel ? " flex" : " hidden")
        }
      >
        <div className="card-body gap-4">
          {/* Place from */}
          <PlaceAutocomplete
            className="input input-bordered input-primary"
            map={mapRef}
            callback={(place) => {
              setPlaceFrom(place);
              mapRef.panTo(place.geometry.location);
              mapRef.setZoom(15);
            }}
            placeholder="From"
          />
          {/* Place to */}
          <PlaceAutocomplete
            className="input input-bordered input-primary"
            map={mapRef}
            callback={(place) => {
              setPlaceTo(place);
              mapRef.panTo(place.geometry.location);
              mapRef.setZoom(15);
            }}
            placeholder="To"
          />
          {/* Search button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log("Calculating Path");
                if (placeFrom && placeTo) {
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

import { PlaceAutocomplete } from "Components/Google_Map/PlaceAutoComplete.js";
import { getPath } from "Components/Functions/Path.js";

const SearchPanel = (props) => {
  async function updatePath() {
    let placeFrom = await props.placeFrom;
    let placeTo = await props.placeTo;

    let apiLink =
      "/webapi/getSingleRoute?srcLat=" +
      placeFrom.geometry.location.lat() +
      "&srcLon=" +
      placeFrom.geometry.location.lng() +
      "&destLat=" +
      placeTo.geometry.location.lat() +
      "&destLon=" +
      placeTo.geometry.location.lng();

    props.setPath(await getPath(apiLink));
  }

  return (
    <>
      <div
        className={
          "absolute top-16 card font-mono bg-slate-500 max-w-md" +
          (props.showSearchPanel ? " flex" : " hidden")
        }
      >
        <div className="card-body card-compact p-6">
          {/* Place from */}
          <PlaceAutocomplete
            className="input input-accent w-full max-w-md text-black bg-white rounded-none text-sm"
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
            className="input input-accent w-full max-w-md text-black bg-white rounded-none text-sm"
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
              className="btn text-white hover:border-white hover:border-2"
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

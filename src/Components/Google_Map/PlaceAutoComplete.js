import { createRef, useEffect, useState } from "react";

/**
 * React component that renders an autocomplete search box.
 * @property {Object} map - The map to add the search box to.
 * @property {function} callback - Callback function to handle the search box.
 * @property {string} style - The style of the search box.
 * @property {string} placeholder - The placeholder text of the search box.
 * @property {string} className - The class name of the search box.
 * @example
 * <GoogleMap>
 *   <PlaceAutocomplete callback={handlePlace} />
 * </GoogleMap>
 * @example
 * <PlaceAutocomplete map={map} callback={handlePlace} />
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
 * @see https://developers.google.com/maps/documentation/javascript/places-autocomplete
 */
export function PlaceAutocomplete(props) {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionInputFocus, setSuggestionInputFocus] = useState(false);
  const ref = createRef();
  const autoCompleteService =
    new window.google.maps.places.AutocompleteService();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSuggestionInputFocus(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  const onSuggestionInputChange = (event) => {
    setInputText(event.target.value);

    if (event.target.value == "") {
      setSuggestions([]);
      return;
    }

    autoCompleteService.getQueryPredictions(
      {
        input: event.target.value,
        bounds: props.map.getBounds(),
        types: ["geocode"],
      },
      (predictions, status) => {
        console.log(predictions)
        if (status === "OK") {
          const newSuggestionList = predictions.map((prediction) => ({
            description: prediction.description,
            placeId: prediction.place_id,
          }));
          setSuggestions(newSuggestionList);
        } else if (status === "ZERO_RESULTS") {
          setSuggestions([]);
        }
      }
    );
  };

  const onSuggestionListClick = (placeId, description) => {
    setInputText(description);
    const placeDetailRequest = new window.google.maps.places.PlacesService(
      ref.current
    );
    
    placeDetailRequest.getDetails(
      {
        placeId: placeId,
      },
      (predictions, status) => {
        if (status === "OK" && predictions) {
          console.log(predictions);
          props.callback(predictions);
        }
      }
    );
  };

  // Render the input box.
  return (
    <div className="w-96">
      <input
        className={props.className || "Autocomplete"}
        id={props.id || "Autocomplete"}
        ref={ref}
        type="text"
        style={props.style || {}}
        placeholder={props.placeholder || ""}
        onChange={(e) => onSuggestionInputChange(e)}
        onClick={() => setSuggestionInputFocus(true)}
        value={inputText}
      />
      {suggestionInputFocus && suggestions.length > 0 && (
        <ul
          tabIndex={0}
          class="dropdown-content menu p-2 bg-base-100 text-sm max-w-full"
        >
          {suggestions.map((suggestion) => {
            return (
              <li>
                <a onClick={() => onSuggestionListClick(suggestion.placeId, suggestion.description)}>
                  {suggestion.description}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

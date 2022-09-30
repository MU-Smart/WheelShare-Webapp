import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

/**
 * * The form in this component 4 fields and each field has 2 clones:
 * * 1 clone is the object received from the parent -> to init the value
 * * 1 clone is the form's field -> keep track the changes and use properties from react-hook-form
 * ! To keep it simple, the object received from the parents is ONLY limit to init the value
 * ! The form will update its own fields, then call the parents method so the parent can update their variable
 * ! The form will only call the parents method onSubmit -> this is by design to avoid bugs!!!
 * TODO: Try to reduce to using only the clone from the parent. This might not be possible though.
 */

const SearchBar = ({ geocode, startMarker, endMarker, updateMarker, startAddress, endAddress, updateAddress }) => {
  const start = startAddress === null ? "" : startAddress;
  const end = endAddress === null ? "" : endAddress;
  const startCoordinate = startMarker.getLngLat() === undefined ? [] : startMarker.getLngLat();
  const endCoordinate = endMarker.getLngLat() === undefined ? [] : endMarker.getLngLat();

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      startAddress: start,
      endAddress: end,
      startAddressCoordinate: startCoordinate,
      endAddressCoordinate: endCoordinate,
  },
  });

  const watchStartAddress = watch("startAddress", "");
  const watchEndAddress = watch("endAddress", "");
  const watchStartAddressCoordinate = watch("startAddressCoordinate", "");
  const watchEndAddressCoordinate = watch("endAddressCoordinate", "");
  const [showStartDropDown, setShowStartDropDown] = useState(false);
  const [showEndDropDown, setShowEndDropDown] = useState(false);
  const [startAddressList, setStartAddressList] = useState([]);
  const [endAddressList, setEndAddressList] = useState([]);

  //  ======= Helper Functions ======= \\
  /**
   * Swap values of the two fields and their associating field value
   * ! Be careful with this. This is a buggy function!
   */
  const swapInputs = () => {
    const tempAddress = watchStartAddress;
    const tempCoordinate = watchStartAddressCoordinate;
    setValue("startAddress", watchEndAddress);
    setValue("endAddress", tempAddress);
    setValue("startAddressCoordinate", watchEndAddressCoordinate);
    setValue("endAddressCoordinate", tempCoordinate);
  };

  /**
   * Retreive a list of suggestions based on the address input from the user
   * @param {*} address the input from the user
   * @param {*} isStart start or end. true if start, false if end.
   * TODO: Improve the suggestion result. Mapbox stinks but let's try our best.
   * TODO: https://docs.mapbox.com/api/search/geocoding/
   * ! This is an async function.
   */
  const retrieveSuggestionList = async (address, isStart) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json";

    await axios({
      method: "get",
      url: url,
      params: {
        access_token: process.env.REACT_APP_TOKEN,
        proximity: "-84.734793,39.5145225",
        autocomplete: false,
        country: 'US',
        type: "place"
      },
    })
      .then((res) => {
        const suggestedList = [];
        for (let elem of res.data.features) {
          suggestedList.push([elem.place_name, elem.center]);
        }

        if (isStart) {
          setStartAddressList(suggestedList);
        } else {
          setEndAddressList(suggestedList);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Function to handle submit event
   * * This is the only place where parent's functions are called
   * ! Let's keep it this way to avoid bugs because the OffCanvas will
   * ! automatically unmount when hidden, causing data lost.
   * @param {*} data react-hook-form data result when submitted the form
   */
  const onSubmit = (data) => {
    updateAddress(watchStartAddress, true);
    updateAddress(watchEndAddress, false);
    
    /**
     * If the user choose an item from a dropdown -> Use the associating coordinate for the marker
     * If the user did not -> Use the text from the box
     * ! NOTE: We cannot use text when user pick an item because Mapbox Geocoding API will messed up the whole thing
     * ? For example, if the user choose "Miami University, S Campus Ave., Oxford, Ohio 45056, United States"
     * ? and we put the same text to the API, it will return "Oxford, Ohio" -> Which is so stupid because it will just match 
     * ? the later part of the address string. But we have no choice but to perform some trick to overcome this.  
     */

    if (data.startAddressCoordinate.length === 0)  {
      geocode(data.startAddress, true);
    } else  {
      updateMarker(data.startAddressCoordinate, true);
    }

    if (data.endAddressCoordinate.length === 0)  {
      geocode(data.endAddress, false);
    } else  {
      updateMarker(data.endAddressCoordinate, false);
    }
  };

  /**
   * Retrieve a new suggestion list whenever the user type in some new inputs
   */
  useEffect(() => {
    retrieveSuggestionList(watchStartAddress, true);
  }, [watchStartAddress]);

  useEffect(() => {
    retrieveSuggestionList(watchEndAddress, false);
  }, [watchEndAddress]);

    //  ======= Return ======= \\
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div id="Searchbar-Area">
        <Form.Control
          type="text"
          className="Searchbar-Search"
          id="startLocation"
          placeholder="Starting point"
          {...register("startAddress", {
            onChange: () => {
              setValue("startAddressCoordinate", []);
            },
          })}
          onFocus={() => {
            setShowStartDropDown(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowStartDropDown(false), 100);
          }}
        />
        {showStartDropDown && (
          <Dropdown.Menu className="Dropdown" show>
            <Dropdown.Header>Start Location Suggestions</Dropdown.Header>
            {startAddressList.map((locationList, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    setValue("startAddress", locationList[0]);
                    setValue("startAddressCoordinate", locationList[1]);
                  }}
                >
                  {locationList[0]}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        )}

        <Form.Control
          type="text"
          className="Searchbar-Search"
          id="endLocation"
          placeholder="Ending point"
          {...register("endAddress", {
            onChange: (e) => {
              setValue("endAddressCoordinate", []);
            },
          })}
          onFocus={() => {
            setShowEndDropDown(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowEndDropDown(false), 100);
          }}
        />

        {showEndDropDown && (
          <Dropdown.Menu className="Dropdown" show>
            <Dropdown.Header>End Location Suggestions</Dropdown.Header>
            {endAddressList.map((locationList, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    setValue("endAddress", locationList[0]);
                    setValue("endAddressCoordinate", locationList[1]);
                  }}
                >
                  {locationList[0]}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        )}

        <Button className="Searchbar-Submit" onClick={() => swapInputs()}>
          Swap
        </Button>

        <Button
          type="submit"
          className="btn-primary Searchbar-Submit"
          value="Search"
        >
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;

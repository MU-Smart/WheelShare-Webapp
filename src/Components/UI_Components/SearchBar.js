import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const SearchBar = ({ geocode, updateMarker, startAddress, endAddress, updateAddress }) => {
  const init = () => {
    const start = startAddress === null ? "" : startAddress;
    const end = endAddress === null ? "" : endAddress;

    return {
        startAddress: start,
        endAddress: end,
        startAddressCoordinate: [],
        endAddressCoordinate: [],
    }
  }

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: init(),
  });

  const watchStartAddress = watch("startAddress", "");
  const watchEndAddress = watch("endAddress", "");
  const [showStartDropDown, setShowStartDropDown] = useState(false);
  const [showEndDropDown, setShowEndDropDown] = useState(false);
  const [startAddressList, setStartAddressList] = useState([]);
  const [endAddressList, setEndAddressList] = useState([]);

  const swapInputs = () => {
    const temp = watchStartAddress;
    setValue("startAddress", watchEndAddress);
    setValue("endAddress", temp);
  };

  const retrieveSuggestionList = async (address, startOrEnd) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json";

    await axios({
      method: "get",
      url: url,
      params: {
        access_token: process.env.REACT_APP_TOKEN
      },
    })
      .then((res) => {
        const suggestedList = [];
        for (let elem of res.data.features) {
          suggestedList.push([elem.place_name, elem.center]);
        }

        if (startOrEnd === 0) {
          setStartAddressList(suggestedList);
        } else {
          setEndAddressList(suggestedList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveSuggestionList(watchStartAddress, 0);
    updateAddress(watchStartAddress, true);
  }, [watchStartAddress]);

  useEffect(() => {
    retrieveSuggestionList(watchEndAddress, 1);
    updateAddress(watchEndAddress, false);
  }, [watchEndAddress]);

  const onSubmit = (data) => {
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
                    updateAddress(locationList[0], true);
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
                    updateAddress(locationList[0], false);
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

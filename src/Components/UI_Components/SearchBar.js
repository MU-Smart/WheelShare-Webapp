import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MyMarker from "Components/UI_Components/Marker";
import mapboxgl from "mapbox-gl";
import axios from "axios";

const SearchBar = ({ GetRoute, geocode }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const watchStartAddress = watch("startAddress", "");
  const watchEndAddress = watch("endAddress", "");
  const [showStartDropDown, setShowStartDropDown] = useState(false);
  const [showEndDropDown, setShowEndDropDown] = useState(false);
  const [startAddressList, setStartAddressList] = useState([]);
  const [endAddressList, setEndAddressList] = useState([]);

  const startMarker = MyMarker({
    name: "Start Address",
    center: new mapboxgl.LngLat(0, 0),
  });

  const endMarker = MyMarker({
    name: "End Address",
    center: new mapboxgl.LngLat(0, 0),
  });

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
        access_token:
          "pk.eyJ1Ijoibmljb2thc3oiLCJhIjoiY2t6MjE2NXprMDF4czJ2b21uZjhqOXlhaCJ9.pzhG-dabniu4rtlDnkIVjw",
      },
    })
      .then((res) => {
        const suggestedList = [];
        for (let elem of res.data.features) {
          suggestedList.push(elem.place_name);
        }

        if (startOrEnd == 0) {
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
  }, [watchStartAddress]);

  useEffect(() => {
    retrieveSuggestionList(watchEndAddress, 1);
  }, [watchEndAddress]);

  const onClickDropdownItemStart = (value) => {
    setValue("startAddress", value);
  };

  const onSubmit = (data) => {
    GetRoute();
    geocode(data.startAddress, startMarker);
    geocode(data.endAddress, endMarker);
    console.log(data)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div id="Searchbar-Area">
        <Form.Control
          type="text"
          className="Searchbar-Search"
          id="startLocation"
          placeholder="Starting point"
          {...register("startAddress")}
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
            {startAddressList.map((location) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    setValue("startAddress", location);
                  }}
                >
                  {location}
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
          {...register("endAddress")}
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
            {endAddressList.map((location, index) => {
              return (
                <Dropdown.Item
                  as="button"
                  key={index}
                  onClick={() => {
                    setValue("endAddress", location);
                  }}
                >
                  {location}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        )}

        <Button className="Searchbar-Submit" onClick={() => swapInputs()}>
          Swap
        </Button>

        <input
          type="submit"
          className="btn-primary Searchbar-Submit"
          value="Search"
        />
      </div>
    </Form>
  );
};

export default SearchBar;

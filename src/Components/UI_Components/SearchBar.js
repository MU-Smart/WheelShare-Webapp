import * as React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useCallback, useState } from "react";
import MyMarker from "Components/UI_Components/Marker";
import mapboxgl from "mapbox-gl";

const SearchBar = ({ GetRoute, geocode }) => {
  const startMarker = MyMarker({
    name: "Start Address",
    center: new mapboxgl.LngLat(0, 0),
  });

  const endMarker = MyMarker({
    name: "End Address",
    center: new mapboxgl.LngLat(0, 0),
  });

  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");

  const onChangeStart = useCallback((evt) => {
    setStartAddress(evt.target.value);
  }, []);

  const onChangeEnd = useCallback((evt) => {
    setEndAddress(evt.target.value);
  }, []);

  const swapInputs = useCallback(() => {
    const temp = startAddress;
    setStartAddress(endAddress);
    setEndAddress(temp);
  }, [startAddress, endAddress]);

  const onSubmit = (evt) => {
    GetRoute();
    evt.preventDefault();

    geocode(startAddress, startMarker);
    geocode(endAddress, endMarker);
  };

  return (
    <Form onSubmit={onSubmit}>
      <div id="Searchbar-Area">
        <Row>
          <Col md={8}>
            <input
              type="text"
              className="form-control Searchbar-Search"
              id="startLocation"
              placeholder="Starting point"
              onChange={onChangeStart}
              value={startAddress || ""}
            />
          </Col>
          <Col md={4}>
            <Button className="Searchbar-Submit" onClick={swapInputs}>
              Swap
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <input
              type="text"
              className="form-control Searchbar-Search"
              id="endLocation"
              placeholder="Ending point"
              onChange={onChangeEnd}
              value={endAddress || ""}
            />
          </Col>
          <Col md={4}>
            <input
              type="submit"
              className="btn-primary Searchbar-Submit"
              value="Search"
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default SearchBar;

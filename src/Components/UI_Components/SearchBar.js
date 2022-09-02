import * as React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MyMarker from "Components/UI_Components/Marker";
import mapboxgl from "mapbox-gl";

const SearchBar = ({ GetRoute, geocode }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const watchStartAddress = watch("startAddress", "");
  const watchEndAddress = watch("endAddress", "");

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
    setValue("startAddress", watchEndAddress)
    setValue("endAddress", temp);
  };

  const onSubmit = (data) => {
    GetRoute();

    geocode(data.startAddress, startMarker);
    geocode(data.endAddress, endMarker);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div id="Searchbar-Area">
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              className="Searchbar-Search"
              id="startLocation"
              placeholder="Starting point"
              {...register("startAddress")}
            />
          </Col>

          <Col md={4}>
            <Button className="Searchbar-Submit" onClick={() => swapInputs()}>
              Swap
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              className="Searchbar-Search"
              id="endLocation"
              placeholder="Ending point"
              {...register("endAddress")}
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

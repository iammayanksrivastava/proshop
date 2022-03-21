import React from "react";
import { Spinner } from "react-bootstrap";

const loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ width: "100px", height: "100px", margin: "auto" }}
    >
      <span>Loading..</span>
    </Spinner>
  );
};

export default loader;

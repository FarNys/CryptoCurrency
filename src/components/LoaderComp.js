import React from "react";
import Loader from "react-js-loader";
import "../styles/LoaderComp.css";

const LoaderComp = () => {
  return (
    <div className="loader_conainer">
      <Loader
        type="spinner-default"
        bgColor={"#93f9b9"}
        color={"#434353"}
        size={50}
      />
    </div>
  );
};

export default LoaderComp;

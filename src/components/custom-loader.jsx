import React from "react";
import "../scss/css/loader.css";

const CustomLoader = ({ variant = "green" }) => {
  return (
    <div className="loader-container">
      <div className={`loader ${variant}`}>
        <div className="loader-ring outer-ring"></div>
        <div className="loader-ring middle-ring"></div>
        <div className="loader-ring inner-ring"></div>
        <div className="loader-dot"></div>
      </div>
    </div>
  );
};

export default CustomLoader;

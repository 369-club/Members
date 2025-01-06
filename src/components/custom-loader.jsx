import React from "react";
import "../scss/css/loader.css";

const CustomLoader = ({ variant = "green", gap = "60" }) => {
  return (
    <div style={{ paddingTop: `${gap}px`, paddingBottom: `${gap}px` }}>
      <div className="loader-container">
        <div className={`loader ${variant}`}>
          <div className="loader-ring outer-ring"></div>
          <div className="loader-ring middle-ring"></div>
          <div className="loader-ring inner-ring"></div>
          <div className="loader-dot"></div>
        </div>

        <div className={`loading-text ${variant}`}>
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;

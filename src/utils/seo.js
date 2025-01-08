import React from "react";
import { Helmet } from "react-helmet-async";

const Seo = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title ? `${title} | Club 369` : "Club 369"}</title>
      <meta
        name="description"
        content={description ? `${description}` : "Club 369"}
      />
    </Helmet>
  );
};

export default Seo;

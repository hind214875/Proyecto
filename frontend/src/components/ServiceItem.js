import React from "react";
import { Link } from "react-router-dom";

const ServiceItem = ({
  title,
  image1,
  image2,
  link,
  description,
  price,
  profesional,
}) => {
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="service-item">
        <div className="service-top">
          <img src={image1} alt="Service" />
          <img src={image2} alt="Service" />
        </div>
        <h3>
          <Link to={link}>{title}</Link>
        </h3>
        <p>{description}</p>
        <p>Price: {price}</p>
        <p>Professional: {profesional || "Not Assigned"}</p>
        {/* <Link to={link} className="service-link">
          Learn More <i className="bx bx-right-arrow-alt"></i>
        </Link> */}
      </div>
    </div>
  );
};

export default ServiceItem;

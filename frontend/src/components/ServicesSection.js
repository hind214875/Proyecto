import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ServiceItem from "./ServiceItem";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const { serviceName } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      // Construct the endpoint based on whether serviceName is provided
      const endpoint = serviceName
        ? `http://localhost/Tarea3/backend/src/index.php/services/${serviceName}`
        : `http://localhost/Tarea3/backend/src/index.php/services`;

      try {
        console.log(`Fetching services from: ${endpoint}`);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data received:", data);

        // Handle the case where no services are found for a category
        if (
          data.message &&
          data.message === "No services found for this category"
        ) {
          setServices([]); // Set to an empty array if no services
        } else {
          setServices(data);
        }
      } catch (error) {
        console.error("There was an error fetching the services:", error);
      }
    };

    fetchServices();
  }, [serviceName]);
  return (
    <section className="service-area three pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Our Services</span>
          <h2>We Are Committed To Give Our Best Services</h2>
        </div>
        <div className="row">
          {services.length > 0 ? (
            services.map((service, index) => (
              <ServiceItem
                key={index}
                title={service.nombre}
                description={service.descripcion}
                price={service.precio}
                profesional={service.profesional_name}
              />
            ))
          ) : (
            <p>No services found.</p>
          )}
        </div>
      </div>
      {/* Pagination - placeholder for now */}
      <div className="pagination-area">
        <ul>
          <li>
            <Link to="#">Prev</Link>
          </li>
          <li>
            <Link to="#">1</Link>
          </li>
          <li>
            <Link to="#">2</Link>
          </li>
          <li>
            <Link to="#">3</Link>
          </li>
          <li>
            <Link to="#">Next</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;

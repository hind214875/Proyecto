import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ServiceItem from "./ServiceItem";
import { useAuth } from "./AuthContext";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const { serviceName } = useParams();
  const { authState } = useAuth();

  const usuarioId = authState?.usuario_id;

  const handleServiceRequest = async (servicioId, profesionalId) => {
    try {
      const response = await fetch(
        `http://localhost/Tarea3/backend/src/index.php/reserva`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: usuarioId,
            profesional_id: profesionalId,
            servicio_id: servicioId,
          }),
        }
      );
      const data = await response.json();
      console.log("data: ", data);
      if (!response.ok) throw new Error(data.message || "An error occurred");
      if (data.success === false) {
        alert(data.message); // Show error message if reservation already exists
      } else {
        alert("Service request sent successfully!");
      }
    } catch (error) {
      alert("Failed to send service request: " + error.message);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const endpoint = serviceName
        ? `http://localhost/Tarea3/backend/src/index.php/services/${serviceName}`
        : `http://localhost/Tarea3/backend/src/index.php/services`;

      try {
        //console.log(`Fetching services from: ${endpoint}`);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        //console.log("Data received:", data);

        //the case where no services are found for a category
        if (
          data.message &&
          data.message === "No services found for this category"
        ) {
          setServices([]);
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
                handleServiceRequest={handleServiceRequest}
                servicioId={service.servicio_id}
                profesionalId={service.profesional_id}
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

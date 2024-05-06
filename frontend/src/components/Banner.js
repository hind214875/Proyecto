import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch services on component mount
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost/Tarea3/backend/src/index.php/services"
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        const data = await response.json();
        setServices(data); // Set fetched services to state
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchServices();
  }, []);

  // Handler when service is selected from the dropdown
  const handleServiceChange = (e) => {
    const serviceName = e.target.value;
    if (serviceName !== "Choose Your Service") {
      navigate(`/serviceSection/${serviceName}`);  
    }
  };

  // Handler when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the selected service from the form
    const serviceName = e.target.elements.service.value;
    if (serviceName && serviceName !== "Choose Your Service") {
      navigate(`/serviceSection/${serviceName}`); 
    }
  };
  return (
    <div className="banner-area three">
      <div className="banner-shape">
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/home-three/banner-main.jpg`}
          alt="Banner"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/home-one/banner-shape1.png`}
          alt="Shape"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/home-three/banner-shape1.png`}
          alt="Shape"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/home-one/banner-shape3.png`}
          alt="Shape"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/home-one/banner-shape4.png`}
          alt="Shape"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/home-one/banner-shape5.png`}
          alt="Shape"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/home-one/banner-shape6.png`}
          alt="Shape"
        />
      </div>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="banner-text">
              <h1>
                Best <span>Cleaning</span> Service Agency In The Town
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. It has been the industry's standard dummy text ever.
              </p>
              <div className="banner-service">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="form-group">
                        <select
                          className="nice-select"
                          onChange={handleServiceChange}
                          name="service"
                        >
                          <option value="">Choose Your Service</option>
                          {services.map((service) => (
                            <option
                              key={service.servicio_id}
                              value={service.nombre}
                            >
                              {service.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <button type="submit" className="btn cmn-btn">
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

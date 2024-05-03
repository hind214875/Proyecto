import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OfferServiceForm = ({ profesional_id }) => {
  const [categories, setCategories] = useState([]);
  const [isSubmitting] = useState(false);
  const [successMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const successMessageStyles = {
    padding: "10px 20px",
    margin: "20px 0",
    borderRadius: "5px",
    backgroundColor: "#dff0d8",
    color: "#3c763d",
    textAlign: "center",
    border: "1px solid #d6e9c6",
    fontSize: "1rem",
    fontWeight: "bold",
  };

  const [service, setService] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria_id: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "http://localhost/Tarea3/backend/src/index.php/categories"
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      ...service,
      profesional_id: profesional_id,
    });

    console.log("Submitting the following data:", formData);

    try {
      const response = await fetch(
        "http://localhost/Tarea3/backend/src/index.php/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data && !data.error) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/services");
        }, 5000); // Show the message for 5 seconds before redirecting
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="estimate-area ptb-100">
      <div className="container">
        <div className="estimate-content">
          <div className="section-title">
            <h2>Offer Your Services</h2>
            {successMessage && <p className="success">{successMessage}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={service.nombre}
                    onChange={handleChange}
                    placeholder="Service Name"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="precio"
                    className="form-control"
                    value={service.precio}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea
                    name="descripcion"
                    rows="6"
                    className="form-control"
                    value={service.descripcion}
                    onChange={handleChange}
                    placeholder="Service Description"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <select
                    name="categoria_id"
                    value={service.categoria_id}
                    className="form-control"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoria_id}
                        value={category.categoria_id}
                      >
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <button
                  type="submit"
                  className="btn cmn-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Offer Service"}
                </button>

                {showSuccess && (
                  <div style={successMessageStyles}>
                    Service created successfully!
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferServiceForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Utility function to validate form fields
const validateFields = (fields) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(fields.email.trim())) {
    errors.email = "Email is invalid";
  }

  if (!fields.password.trim()) {
    errors.password = "Password is required";
  }

  if (!fields.isSignIn) {
    if (!fields.nombre.trim()) {
      errors.nombre = "Name is required";
    }
    if (fields.tipo === "professional" && !fields.especialidad.trim()) {
      errors.especialidad = "Specialty is required for professionals";
    }
  }

  return errors;
};

const AuthForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formState, setFormState] = useState({
    isSignIn: true,
    email: "",
    password: "",
    nombre: "",
    especialidad: "",
    tipo: "user",
    errors: {},
  });

  // Clears the error messages when the form type is toggled
  const clearErrors = () =>
    setFormState((prevState) => ({ ...prevState, errors: {} }));

  // Handles the form submission for both login and registration
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateFields(formState);

    if (Object.keys(errors).length > 0) {
      setFormState((prevState) => ({ ...prevState, errors }));
      return;
    }

    try {
      const endpoint = formState.isSignIn
        ? "http://localhost/Tarea3/backend/src/index.php/login"
        : "http://localhost/Tarea3/backend/src/index.php/register";

      const payload = formState.isSignIn
        ? { email: formState.email, password: formState.password }
        : {
            nombre: formState.nombre,
            email: formState.email,
            password: formState.password,
            tipo: formState.tipo,
            ...(formState.tipo === "professional" && {
              especialidad: formState.especialidad,
            }),
          };

      console.log("Sending payload:", payload);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "An error occurred");

      if (data.error) {
        setFormState((prevState) => ({
          ...prevState,
          errors: { form: data.message },
        }));
      } else {
        if (formState.isSignIn) {
          signIn({ ...data, userName: data.nombre });
          navigate("/");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        errors: { form: error.message },
      }));
    }
  };

  // Updates the form state based on input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // condition for the checkbox
    if (type === "checkbox") {
      setFormState((prevState) => ({
        ...prevState,
        tipo: checked ? "professional" : "user",
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    clearErrors();
  };

  // Toggles between sign in and sign up mode
  const toggleMode = () => {
    setFormState((prevState) => ({
      ...prevState,
      isSignIn: !prevState.isSignIn,
      email: "",
      password: "",
      nombre: "",
      especialidad: "",
      tipo: "user",
      errors: {},
    }));
  };

  // Input fields with error handling display
  const renderInputField = (name, placeholder, type = "text") => (
    <div className="form-group">
      <input
        type={type}
        className={`form-control ${formState.errors[name] ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={formState[name]}
        onChange={handleInputChange}
        name={name}
      />
      {formState.errors[name] && (
        <div className="error-message">{formState.errors[name]}</div>
      )}
    </div>
  );

  return (
    <div className="user-form-area ptb-100">
      <div className="container">
        <div className="user-item">
          <h2>{formState.isSignIn ? "Sign In" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {!formState.isSignIn && renderInputField("nombre", "Nombre")}
            {formState.tipo === "professional" &&
              renderInputField("especialidad", "Especialidad")}
            {renderInputField("email", "Email", "email")}
            {renderInputField("password", "Password", "password")}
            {!formState.isSignIn && (
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formState.tipo === "professional"}
                    onChange={handleInputChange}
                    name="tipo"
                  />
                  Register as a professional
                </label>
              </div>
            )}
            <div className="form-group">
              <button
                type="submit"
                className="btn cmn-btn"
                style={{ marginRight: "10px" }}
              >
                {formState.isSignIn ? "Sign In" : "Sign Up"}
              </button>
              <button
                type="button"
                className="btn cmn-btn"
                onClick={toggleMode}
              >
                {formState.isSignIn
                  ? "Need an account? Sign Up"
                  : "Have an account? Sign In"}
              </button>
            </div>
            {formState.errors.form && (
              <div className="error-message text-center">
                {formState.errors.form}
              </div>
            )}
          </form>
        </div>
      </div>
      <style>{`
        .is-invalid {
          border: 2px solid #dc3545;
        }

        .error-message {
          color: #dc3545;
          font-size: 0.875em;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
};
export default AuthForm;

import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { authState, signOut: signOutContext } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    signOutContext();
    navigate("/");
  };

  return (
    <div className="navbar-area two fixed-top">
      {/* Menu For Mobile Device */}
      <div className="mobile-nav">
        <Link to="/" className="logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
            alt="Logo"
          />
        </Link>
      </div>

      {/* Menu For Desktop Device */}
      <div className="main-nav">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link to="/" className="navbar-brand">
              <img src="/assets/img/logo.png" alt="Logo" />
            </Link>
            <div
              className="collapse navbar-collapse mean-menu"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/services" className="nav-link">
                    Services
                  </Link>
                </li>
                {/* show the Projects link just for professionals */}
                {authState && authState.tipo === "professional" && (
                  <li className="nav-item">
                    <Link to="/projects" className="nav-link">
                      Projects
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                </li>
                {/* SignIn/Up */}
                {authState ? (
                  <li
                    className="nav-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "#ffd700", fontWeight: "bold" }}>
                      Welcome, {authState.userName}
                    </span>

                    {/* Make sure it matches the property name from your authState */}
                    <button
                      style={{
                        backgroundColor: "#f0ad4e",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      onClick={signOut}
                    >
                      Sign Out
                    </button>
                  </li>
                ) : (
                  // Display sign-in/sign-up links
                  <li className="nav-item">
                    <Link to="/auth">Sign In</Link>
                  </li>
                )}
              </ul>

              <div className="side-nav">
                <Link to="#">Book A Schedule</Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Navbar;

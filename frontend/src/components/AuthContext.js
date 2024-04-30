import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(
    JSON.parse(localStorage.getItem("authData"))
  );
  const [professionalId, setProfessionalId] = useState(
    JSON.parse(localStorage.getItem("professionalId"))
  );

  useEffect(() => {
    // Fetch professionalId when authState changes and is a professional
    if (
      authState &&
      authState.tipo === "professional" &&
      authState.usuario_id
    ) {
      fetchProfessionalId(authState.usuario_id);
    }
  }, [authState]);

  const fetchProfessionalId = async (usuarioId) => {
    try {
      const response = await fetch(
        `http://localhost/Tarea3/backend/src/index.php/getProfessionalId`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario_id: usuarioId }),
        }
      );
      const data = await response.json();
      if (data.profesional_id) {
        localStorage.setItem(
          "professionalId",
          JSON.stringify(data.profesional_id)
        );
        setProfessionalId(data.profesional_id);
      } else {
        throw new Error(data.message || "Failed to fetch professional ID");
      }
    } catch (error) {
      console.error("Error fetching professional ID:", error.message);
    }
  };

  const signIn = (userData) => {
    localStorage.setItem("authData", JSON.stringify(userData));
    setAuthState(userData);
  };

  const signOut = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("professionalId");
    setAuthState(null);
    setProfessionalId(null);
  };

  return (
    <AuthContext.Provider
      value={{ authState, professionalId, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

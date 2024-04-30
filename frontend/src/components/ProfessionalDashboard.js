import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProfessionalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const { professionalId } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      if (professionalId) {
        try {
          const response = await fetch(
            `http://localhost/Tarea3/backend/src/index.php/professionalRequests/${professionalId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setRequests(data);
        } catch (error) {
          console.error(
            "There was an error fetching the service requests:",
            error
          );
        }
      }
    };

    fetchRequests();
  }, [professionalId]);

  const updateRequestStatus = async (reservaId, status) => {
    try {
      const response = await fetch(
        `http://localhost/Tarea3/backend/src/index.php/updateRequest/${reservaId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An error occurred");

      // Refresh the list of requests
      setRequests(
        requests.map((request) =>
          request.reserva_id === reservaId
            ? { ...request, estado: status }
            : request
        )
      );
    } catch (error) {
      console.error("There was an error updating the service request:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">Service Requests</h2>
      <div className="row">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div className="col-lg-12" key={request.reserva_id}>
              <div className="service-item">
                <h3>{request.servicio_name}</h3>
                <p>{request.description}</p>
                <p>Requested by: {request.usuario_name}</p>
                <p>Status: {request.estado}</p>
                <div>
                  <button
                    onClick={() =>
                      updateRequestStatus(request.reserva_id, "accepted")
                    }
                    className="btn cmn-btn btn-spacing-right"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      updateRequestStatus(request.reserva_id, "rejected")
                    }
                    className="btn cmn-btn btn-spacing-right"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No service requests found.</p>
        )}
      </div>
      <style>{`
       .btn-spacing-right {
        margin-right: 10px;
      }
      `}</style>
    </div>
  );
};

export default ProfessionalDashboard;

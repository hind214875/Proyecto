<?php
class ReservacionController
{
    private $db;
    private $table_name = "reserva";

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function createReserva($usuario_id, $profesional_id, $servicio_id)
    {

        // Check if reservacion already exists
        if ($this->checkExistingReserva($usuario_id, $servicio_id, $profesional_id)) {
            return ["success" => false, "message" => "Reservation already exists for this service and professional"];
        }
        $query = "INSERT INTO " . $this->table_name . " (usuario_id, profesional_id, servicio_id, fecha, estado) VALUES (?, ?, ?, NOW(), 'pending')";

        $stmt = $this->db->prepare($query);


        $usuario_id = htmlspecialchars(strip_tags($usuario_id));
        $profesional_id = htmlspecialchars(strip_tags($profesional_id));
        $servicio_id = htmlspecialchars(strip_tags($servicio_id));


        $stmt->bindParam(1, $usuario_id);
        $stmt->bindParam(2, $profesional_id);
        $stmt->bindParam(3, $servicio_id);

        if ($stmt->execute()) {
            return ["success" => true, "message" => "Reservation successfully created"];
        }

        return ["success" => false, "message" => "Unable to create reservation"];
    }

    public function checkExistingReserva($usuario_id, $servicio_id, $profesional_id)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE usuario_id = ? AND servicio_id = ? AND profesional_id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(1, $usuario_id);
        $stmt->bindParam(2, $servicio_id);
        $stmt->bindParam(3, $profesional_id);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }



    public function updateReservaStatus($reserva_id, $status)
    {
        $query = "UPDATE " . $this->table_name . " 
              SET estado = :estado 
              WHERE reserva_id = :reserva_id";

        $stmt = $this->db->prepare($query);

        // bind new values
        $stmt->bindParam(":estado", $status);
        $stmt->bindParam(":reserva_id", $reserva_id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

}
?>
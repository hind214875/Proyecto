<?php
require_once "User.php";

class Professional extends User
{
    private $table_prof = "profesional";
    public $especialidad;


    public function __construct($db)
    {
        parent::__construct($db);
    }

    public function createProfessional()
    {
        $this->conn->beginTransaction();

        $userCreateResult = parent::create();
        if (isset($userCreateResult["error"]) && $userCreateResult["error"]) {
            $this->conn->rollback();
            return $userCreateResult;
        }

        // Insert into Professional
        $query = "INSERT INTO " . $this->table_prof . " (usuario_id, nombre, especialidad) VALUES (:usuario_id, :nombre, :especialidad)";
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->especialidad = htmlspecialchars(strip_tags($this->especialidad));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));

        $usuario_id = $this->conn->lastInsertId();
        $stmt->bindParam(":usuario_id", $usuario_id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":especialidad", $this->especialidad);

        if ($stmt->execute()) {
            $this->conn->commit();
            return array("message" => "Professional created successfully", "error" => false);
        } else {
            $this->conn->rollback();
            return array("message" => "Unable to create the professional", "error" => true);
        }
    }

    public function loginProfessional()
    {
        // First, try to login as a user to verify email and password
        if ($userDetails = parent::login()) {
            // Then check if the user is a professional
            $query = "SELECT * FROM " . $this->table_prof . " WHERE usuario_id = :usuario_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":usuario_id", $this->usuario_id);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                // User is a professional, return the details
                $professionalDetails = $stmt->fetch(PDO::FETCH_ASSOC);
                return array_merge($userDetails, $professionalDetails);
            } else {
                // User is not a professional
                return array("message" => "This user is not a professional", "error" => true);
            }
        } else {
            return false;
        }
    }

    public function getProfessionalIdByUserId($usuario_id)
    {
        $query = "SELECT profesional_id FROM profesional WHERE usuario_id = :usuario_id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":usuario_id", $usuario_id);
        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result ? $result : ["message" => "No professional found for this user", "error" => true];
        } else {
            return ["message" => "Error executing query", "error" => true];
        }
    }

    public function getRequestsByProfessionalId($profesional_id)
    {
        $query = " SELECT r.*, s.nombre as servicio_name, u.nombre as usuario_name 
        FROM reserva r
        JOIN servicio s ON r.servicio_id = s.servicio_id
        JOIN usuario u ON r.usuario_id = u.usuario_id
        WHERE r.profesional_id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $profesional_id);
        $stmt->execute();

        $requests = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $requests[] = $row;
        }

        return $requests;
    }

}
?>
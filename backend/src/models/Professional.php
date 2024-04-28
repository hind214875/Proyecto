<?php
require_once "User.php";

class Professional extends User
{
    private $table_prof = "profesional";
    public $especialidad;

    // Constructor
    public function __construct($db)
    {
        parent::__construct($db);
    }

    public function createProfessional()
    {
        $this->conn->beginTransaction();

        $userCreateResult = parent::create();
        if (isset($userCreateResult['error']) && $userCreateResult['error']) {
            $this->conn->rollback();
            return $userCreateResult;
        }

        // Insert into Professional table
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
            $this->conn->commit(); // Commit the transaction
            return array('message' => 'Professional created successfully', 'error' => false);
        } else {
            $this->conn->rollback(); // Undo the transaction
            return array('message' => 'Unable to create the professional', 'error' => true);
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
                return array('message' => 'This user is not a professional', 'error' => true);
            }
        } else {
            // Login as user failed
            return false;
        }
    }

    public function getProfessionalIdByUserId($usuario_id)
    {
        $query = "SELECT profesional_id FROM profesional WHERE usuario_id = :usuario_id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':usuario_id', $usuario_id);
        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result ? $result : ['message' => 'No professional found for this user', 'error' => true];
        } else {
            return ['message' => 'Error executing query', 'error' => true];
        }
    }

}
?>
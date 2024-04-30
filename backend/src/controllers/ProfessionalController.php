<?php
require_once "UserController.php";
require_once __DIR__ . "/../models/Professional.php";

class ProfessionalController extends UserController
{

    private $professional;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->professional = new Professional($db);
    }


    public function registerProfessional($nombre, $email, $password, $especialidad)
    {
        // Set professional data
        $this->professional->nombre = $nombre;
        $this->professional->Email = $email;
        $this->professional->password = $password;
        $this->professional->tipo = "professional";
        $this->professional->especialidad = $especialidad;

        // create the professional
        $result = $this->professional->createProfessional();
        if ($result === true) {
            return array("message" => "Professional created successfully", "error" => false);
        } else {
            return $result;
        }
    }

    public function loginProfessional($email, $password)
    {
        // validation
        if (empty($email) || empty($password)) {
            return array("message" => "Email and password are required", "error" => true);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return array("message" => "Invalid email format", "error" => true);
        }

        // Set the professional data for login
        $this->professional->Email = $email;
        $this->professional->password = $password;

        // try to login the professional
        $loginResult = $this->professional->loginProfessional();
        if (is_array($loginResult) && isset($loginResult["error"]) && $loginResult["error"]) {
            return $loginResult;
        } elseif ($loginResult) {
            return array("message" => "Professional logged in successfully", "error" => false, "data" => $loginResult);
        } else {
            return array("message" => "Login failed", "error" => true);
        }
    }

    public function getProfessionalIdByUserId($usuario_id)
    {
        return $this->professional->getProfessionalIdByUserId($usuario_id);
    }

    public function getRequestsByProfessionalId($profesional_id)
    {
        return $this->professional->getRequestsByProfessionalId($profesional_id);
    }



}
?>
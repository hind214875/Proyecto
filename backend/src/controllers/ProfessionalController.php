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

        // Attempt to create the professional
        $result = $this->professional->createProfessional();
        if ($result === true) {
            return array('message' => 'Professional created successfully', 'error' => false);
        } else {
            // If result is not true, it should be an array containing the error message
            return $result;
        }
    }

    public function loginProfessional($email, $password)
    {
        // Input validation
        if (empty($email) || empty($password)) {
            return array('message' => 'Email and password are required', 'error' => true);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return array('message' => 'Invalid email format', 'error' => true);
        }

        // Set professional data for login
        $this->professional->Email = $email;
        $this->professional->password = $password;

        // Attempt to login the professional
        $loginResult = $this->professional->loginProfessional();
        if (is_array($loginResult) && isset($loginResult['error']) && $loginResult['error']) {
            // If there's an error, return it
            return $loginResult;
        } elseif ($loginResult) {
            // If login is successful
            return array('message' => 'Professional logged in successfully', 'error' => false, 'data' => $loginResult);
        } else {
            // If login fails
            return array('message' => 'Login failed', 'error' => true);
        }
    }

    public function getProfessionalIdByUserId($usuario_id)
    {
        return $this->professional->getProfessionalIdByUserId($usuario_id);
    }
}
?>
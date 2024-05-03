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
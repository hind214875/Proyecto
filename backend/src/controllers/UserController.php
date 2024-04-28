<?php
require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../models/User.php";

class UserController
{
    protected $user;

    public function __construct($db)
    {
        $this->user = new User($db);
    }

    public function login($email, $password)
    {
        $this->user->Email = $email;
        $this->user->password = $password;
        $loginResult = $this->user->login();

        if (isset($loginResult['usuario_id'])) {
            // If a user_id is set, the login was successful
            return array('message' => 'User logged in successfully', 'usuario_id' => $loginResult['usuario_id'], 'nombre' => $loginResult['nombre'], 'tipo' => $loginResult['tipo']);
        } else {
            // Login failed, return the error message from the login result
            return array('message' => $loginResult['message'], 'error' => true);
        }
    }




    public function register($nombre, $email, $password, $tipo)
    {
        $this->user->nombre = $nombre;
        $this->user->Email = $email;
        $this->user->password = $password;
        $this->user->tipo = $tipo;

        $result = $this->user->create();

        if (!$result['error']) {
            return array('message' => 'User created successfully', 'error' => false);
        } else {
            return $result;
        }
    }
}
?>
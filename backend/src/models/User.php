<?php
class User
{
    protected $conn;
    private $table_name = "usuario";

    public $usuario_id;
    public $nombre;
    public $Email;
    public $password;
    public $tipo;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        // Input validation
        if (empty($this->nombre) || empty($this->Email) || empty($this->password) || empty($this->tipo)) {
            return array('message' => 'All fields are required', 'error' => true);
        }
        if (!filter_var($this->Email, FILTER_VALIDATE_EMAIL)) {
            return array('message' => 'Invalid email format', 'error' => true);
        }

        // Check if user already exists
        $checkQuery = "SELECT * FROM " . $this->table_name . " WHERE Email = :Email";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":Email", $this->Email);
        $checkStmt->execute();
        if ($checkStmt->rowCount() > 0) {
            return array('message' => 'User already exists', 'error' => true);
        }

        // Proceed with registration since user does not exist
        $query = "INSERT INTO " . $this->table_name . " (nombre, Email, password, tipo) VALUES (:nombre, :Email, :password, :tipo)";
        $stmt = $this->conn->prepare($query);

        // sanitize and hash password
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->Email = htmlspecialchars(strip_tags($this->Email));
        $hashed_password = password_hash($this->password, PASSWORD_BCRYPT);
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));

        // bind values
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":Email", $this->Email);
        $stmt->bindParam(":password", $hashed_password);
        $stmt->bindParam(":tipo", $this->tipo);

        if ($stmt->execute()) {
            $this->usuario_id = $this->conn->lastInsertId();
            return array('message' => 'User registered successfully', 'error' => false);
        } else {
            return array('message' => 'Unable to register the user', 'error' => true);
        }
    }



    public function login()
    {
        $query = "SELECT usuario_id, nombre, tipo, password FROM " . $this->table_name . " WHERE email = :Email LIMIT 0,1";
        $stmt = $this->conn->prepare($query);

        $this->Email = htmlspecialchars(strip_tags($this->Email));
        $stmt->bindParam(':Email', $this->Email);

        if ($stmt->execute()) {
            $num = $stmt->rowCount();

            if ($num > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if (password_verify($this->password, $row['password'])) {
                    $this->usuario_id = $row['usuario_id'];
                    $this->nombre = $row['nombre'];
                    $this->tipo = $row['tipo'];

                    return array(
                        'message' => 'User logged in successfully',
                        'usuario_id' => $this->usuario_id,
                        'nombre' => $this->nombre,
                        'tipo' => $this->tipo
                    );
                } else {
                    return array('message' => 'Login failed. Incorrect password.');
                }
            } else {
                return array('message' => 'Login failed. No user found with that email address.');
            }
        } else {
            $error = $stmt->errorInfo();
            return array('message' => 'Login failed. Error executing query.', 'errorInfo' => $error[2]);
        }
    }
}
?>
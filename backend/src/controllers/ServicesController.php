<?php
class ServicesController
{
    private $db;
    private $table_name = "servicio";

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getAllServices()
    {
        $query = "SELECT servicio.*, profesional.nombre as profesional_name FROM servicio LEFT JOIN profesional ON servicio.profesional_id = profesional.profesional_id";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getServicesByCategory($category)
    {
        $query = "SELECT s.*, p.nombre as profesional_name FROM " . $this->table_name . " s 
                  JOIN profesional p on s.profesional_id = p.profesional_id
                  WHERE s.nombre = :category";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':category', $category);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($results)) {
            return ['message' => 'No services found for this category'];
        } else {
            return $results;
        }
    }


    public function createService($data)
    {
        error_log(print_r($data, true));
        //validation
        if (empty($data->nombre) || empty($data->descripcion) || empty($data->precio) || empty($data->categoria_id) || empty($data->profesional_id)) {
            return ['message' => 'Missing required fields', 'error' => true];
        }


        $query = "INSERT INTO " . $this->table_name . " (nombre, descripcion, precio, categoria_id, profesional_id) VALUES (:nombre, :descripcion, :precio, :categoria_id, :profesional_id)";
        $stmt = $this->db->prepare($query);

        // Bind parameters
        $stmt->bindParam(':nombre', $data->nombre);
        $stmt->bindParam(':descripcion', $data->descripcion);
        $stmt->bindParam(':precio', $data->precio);
        $stmt->bindParam(':categoria_id', $data->categoria_id);
        $stmt->bindParam(':profesional_id', $data->profesional_id);

        // Execute the query
        if ($stmt->execute()) {
            return ['message' => 'Service created successfully', 'error' => false];
        } else {
            return ['message' => 'Unable to create the service', 'error' => true];
        }
    }

    public function getCategories()
    {
        $query = "SELECT categoria_id, nombre FROM categoria_de_servicio";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
?>
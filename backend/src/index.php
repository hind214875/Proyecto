<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit;
}

require_once __DIR__ . "/config/database.php";
require_once __DIR__ . "/controllers/UserController.php";
require_once __DIR__ . "/controllers/ProfessionalController.php";
require_once __DIR__ . "/controllers/ServicesController.php";
require_once __DIR__ . "/controllers/ReservacionController.php";

$database = new Database();
$db = $database->getConnection();
$userController = new UserController($db);
$professionalController = new ProfessionalController($db);
$servicesController = new ServicesController($db);
$reservacionController = new ReservacionController($db);

$requestMethod = $_SERVER["REQUEST_METHOD"];
$uri = urldecode(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
$uri = explode("/", $uri);
$uri = array_map("trim", $uri);

// echo "<pre>";
// var_dump($uri);
// echo "</pre>";

// Routes
if (isset($uri[5]) && $uri[5] != "") {
    switch ($uri[5]) {
        case "login":
            if ($requestMethod == "POST") {
                $data = json_decode(file_get_contents("php://input"));
                $response = $userController->login($data->email, $data->password);
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;
        case "register":
            if ($requestMethod == "POST") {
                $data = json_decode(file_get_contents("php://input"));

                // Validate fields 
                if (!isset($data->nombre, $data->email, $data->password, $data->tipo)) {
                    http_response_code(400);
                    echo json_encode(array("message" => "Missing required fields", "error" => true));
                    break;
                }

                if (!property_exists($data, "tipo")) {
                    echo json_encode(array("message" => "Missing tipo field", "error" => true));
                    exit;
                }

                // Check if user is professional
                if ($data->tipo === "professional") {
                    //  check professional especialidad input
                    if (empty($data->especialidad)) {
                        http_response_code(400);
                        echo json_encode(array("message" => "Missing required fields for professional", "error" => true));
                        break;
                    }
                    $response = $professionalController->registerProfessional($data->nombre, $data->email, $data->password, $data->especialidad);
                } else {
                    // normal user registration
                    $response = $userController->register($data->nombre, $data->email, $data->password, $data->tipo);
                }
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;

        case "getProfessionalId":
            if ($requestMethod == "POST") {
                $data = json_decode(file_get_contents("php://input"));

                if (isset($data->usuario_id)) {
                    $response = $professionalController->getProfessionalIdByUserId($data->usuario_id);
                    error_log("Received for getProfessionalId: " . print_r($response, true));
                    echo json_encode($response);
                } else {
                    echo json_encode(["message" => "usuario_id is required", "error" => true]);
                }
            } else {
                http_response_code(405);
                echo json_encode(["message" => "Method Not Allowed"]);
            }
            break;
        case "services":
            if ($requestMethod == "GET") {
                if (isset($uri[6])) {
                    $category = $uri[6];
                    $response = $servicesController->getServicesByCategory($category);
                    echo json_encode($response);
                } else {
                    $response = $servicesController->getAllServices();
                    echo json_encode($response);
                }
            } else if ($requestMethod == "POST") {

                $data = json_decode(file_get_contents("php://input"));

                $response = $servicesController->createService($data);
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;
        case "categories":
            if ($requestMethod == "GET") {
                $response = $servicesController->getCategories();
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;
        case "reserva":
            if ($requestMethod == "POST") {
                $data = json_decode(file_get_contents("php://input"));

                if (!isset($data->usuario_id, $data->profesional_id, $data->servicio_id)) {
                    http_response_code(400);
                    echo json_encode(array("message" => "Missing required fields", "error" => true));
                    break;
                }

                $result = $reservacionController->createReserva($data->usuario_id, $data->profesional_id, $data->servicio_id);

                if ($result["success"]) {
                    http_response_code(201);
                    echo json_encode(["message" => $result["message"]]);
                } else {
                    http_response_code(409);
                    echo json_encode(["message" => $result["message"]]);
                }
            } else {
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;
        case "professionalRequests":
            if ($requestMethod == "GET" && isset($uri[6])) {
                $profesional_id = $uri[6];
                $response = $professionalController->getRequestsByProfessionalId($profesional_id);
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;
        case "updateRequest":
            if ($requestMethod == "PATCH" && isset($uri[6])) {
                $reserva_id = $uri[6];
                $data = json_decode(file_get_contents("php://input"));
                if (!isset($data->status)) {
                    http_response_code(400);
                    echo json_encode(array("message" => "Missing status field", "error" => true));
                    break;
                }

                $result = $reservacionController->updateReservaStatus($reserva_id, $data->status);

                if ($result) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Reservation status updated successfully"));
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Unable to update reservation status"));
                }
            } else {
                http_response_code(405);
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;
        default:
            http_response_code(404);
            echo json_encode(array("message" => "No endpoint found"));
            break;
    }
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No endpoint found"));
}
?>
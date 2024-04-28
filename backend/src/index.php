<?php
// Add these headers at the top of the file before any output
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app domain
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow methods for CORS
header('Access-Control-Allow-Headers: Content-Type'); // Allow headers for CORS
header('Content-Type: application/json; charset=UTF-8'); // Set the Content-Type for JSON responses
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// If you are sending a preflight OPTIONS request, respond with OK status
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Send headers and exit
    header('HTTP/1.1 200 OK');
    exit;
}

require_once __DIR__ . "/config/database.php";
require_once __DIR__ . "/controllers/UserController.php";
require_once __DIR__ . "/controllers/ProfessionalController.php";
require_once __DIR__ . "/controllers/ServicesController.php";


$database = new Database();
$db = $database->getConnection();
$userController = new UserController($db);
$professionalController = new ProfessionalController($db);
$servicesController = new ServicesController($db);

$requestMethod = $_SERVER['REQUEST_METHOD'];
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$uri = explode('/', $uri);
$uri = array_map('trim', $uri);

// echo '<pre>';
// var_dump($uri);
// echo '</pre>';

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

                if (!property_exists($data, 'tipo')) {
                    echo json_encode(array("message" => "Missing tipo field", "error" => true));
                    exit;
                }

                // Check if user is professional
                if ($data->tipo === 'professional') {
                    //  check for professional-specific field
                    if (empty($data->especialidad)) {
                        http_response_code(400);
                        echo json_encode(array("message" => "Missing required fields for professional", "error" => true));
                        break;
                    }
                    $response = $professionalController->registerProfessional($data->nombre, $data->email, $data->password, $data->especialidad);
                } else {
                    // Standard user registration
                    $response = $userController->register($data->nombre, $data->email, $data->password, $data->tipo);
                }
                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(array("message" => "Method Not Allowed"));
            }
            break;

        case "loginProfessional":
            if ($requestMethod == "POST") {
                $data = json_decode(file_get_contents("php://input"));
                $response = $professionalController->loginProfessional($data->email, $data->password);
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
                // Decode the posted data
                $data = json_decode(file_get_contents("php://input"));
                // Call the method createService
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
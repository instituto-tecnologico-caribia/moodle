<?php
require_once(__DIR__ . '/../../config.php');
require_once(__DIR__ . '/classes/autoloader.php');


// Configurar headers para API REST
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $resource = optional_param('resource', '', PARAM_TEXT);
    $method = $_SERVER['REQUEST_METHOD'];
    $body = json_decode(file_get_contents('php://input'), false);
    $headers = getallheaders();

    UserValidator::createUser($body->data);

    $user = Authentications::authenticate($headers);
    if ($method == 'GET') {
        UserController::init($body, $user);
    }

    echo json_encode([
        'error' => 'Action not found'
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

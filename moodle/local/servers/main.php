<?php
require_once(__DIR__ . '/../../config.php');
require_once(__DIR__ . '/classes/autoloader.php');

try {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');

    $body = json_decode(file_get_contents('php://input'), false);
    $headers = getallheaders();

    $user = Authentications::authenticate($headers);
    CourseController::init($body, $user);
    UserController::init($body, $user);

    throw new Exception("Action '{$body->action}' not found");
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
    exit;
}

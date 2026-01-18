<?php
defined('MOODLE_INTERNAL') || die();

class Authentications
{
    public static function authenticate($headers)
    {
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method != 'POST') {
            throw new Exception('Only POST method is allowed');
        }
        
        $token = $headers['api-token'] ?? '';
        if (strpos($token, 'Bearer ') === 0) {
            $token = substr($token, 7);
        }

        // --- Get the user associated with the token ---
        if (!$token) {
            http_response_code(401);
            echo json_encode(['error' => 'Missing tokens']);
            exit;
        }

        // --- Check token in Moodle ---
        global $DB;
        $tokenrecord = $DB->get_record('external_tokens', ['token' => $token, 'userid' => null], '*', IGNORE_MISSING);
        if (!$tokenrecord) {
            // Try without userid = null, for normal tokens
            $tokenrecord = $DB->get_record('external_tokens', ['token' => $token], '*', IGNORE_MISSING);
        }

        if (!$tokenrecord) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token']);
            exit;
        }

        // --- Get the user associated with the token ---
        $user = $DB->get_record('user', ['id' => $tokenrecord->userid], '*', MUST_EXIST);
        return $user;
    }
}

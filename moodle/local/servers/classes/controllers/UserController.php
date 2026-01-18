<?php

defined('MOODLE_INTERNAL') || die();

class UserController {
    public static function init($body, $user) {

        switch ($body->action) {
            case 'get_user':
                self::getUser($user);
                break;
            case 'create_user':
                self::createUser($body);
                break;
            default:
                break;
        }
    }

    private static function getUser($user) {
        echo json_encode($user);
        exit;
    }

    private static function createUser($body) {
        try {
            UserValidator::createUser($body->data);

            global $DB;
            $data = $body->data;
            $data->password = password_hash($data->password, PASSWORD_DEFAULT);
            $data->confirmed = 1;
            $data->mnethostid = 1;

            $sql = "SELECT * FROM {user} WHERE username = :username OR email = :email";
            $params = ['username' => $data->username, 'email' => $data->email];
            $exists = $DB->get_record_sql($sql, $params);
            if ($exists)
                throw new Exception('Username or email already exists');

            $user = $DB->insert_record('user', $data);
            echo json_encode([
                'success' => true,
                'data' => $user
            ]);
            exit;
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
            exit;
        }
    }
}

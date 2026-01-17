<?php

defined('MOODLE_INTERNAL') || die();

class UserController
{
    public static function init($body, $user)
    {

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

    private static function getUser($user)
    {
        echo json_encode($user);
        exit;
    }

    private static function createUser($body)
    {
        global $DB;
        UserValidator::createUser($body->data);
        $data = $body->data;
        $data->password = password_hash($data->password, PASSWORD_DEFAULT);
        $data->confirmed = 1;
        $data->mnethostid = 1;

        $user = $DB->insert_record('user', $data);
        echo json_encode($user);
        exit;
    }
}

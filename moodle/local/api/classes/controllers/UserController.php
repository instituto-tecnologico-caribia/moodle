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
                self::createUser($body, $user);
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

    private static function createUser($body, $user)
    {
        UserValidator::createUser($body);
        echo json_encode($user);
    }
}

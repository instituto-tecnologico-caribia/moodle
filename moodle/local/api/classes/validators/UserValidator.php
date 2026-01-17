<?php
defined('MOODLE_INTERNAL') || die();

use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

class UserValidator
{
    public static function createUser($data)
    {
        $validators = [
            'firstname' => v::stringType()->notEmpty(),
            'lastname'  => v::stringType()->notEmpty(),
            'username'  => v::alnum()->noWhitespace()->length(3, 20),
            'email'     => v::email(),
            'password'  => v::stringType()->length(6, 50),
            'idnumber'  => v::alnum()->noWhitespace(),
            'phone'     => v::phone(),
            'country'   => v::stringType()->notEmpty(),
            'lang'  => v::stringType()->notEmpty(),
        ];

        $errors = [];
        foreach ($validators as $field => $validator) {
            try {
                $validator->assert($data->$field);
            } catch (NestedValidationException $ex) {
                $errors[$field] = $ex->getMessages();
            }
        }

        if (!empty($errors)) {
            echo json_encode($errors);
            exit;
        }
    }
}

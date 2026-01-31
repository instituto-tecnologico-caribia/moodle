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
            'lang'      => v::stringType()->notEmpty(),
        ];

        $errors = [];
        $allowedFields = array_keys($validators);
        $inputFields   = array_keys(get_object_vars($data));

        $extraFields = array_diff($inputFields, $allowedFields);
        if (!empty($extraFields)) {
            foreach ($extraFields as $field) {
                $errors[$field][] = "Field '{$field}' is not allowed.";
            }
        }

        foreach ($validators as $field => $validator) {
            if (!property_exists($data, $field)) {
                $errors[$field][] = "Field '{$field}' is required.";
                continue;
            }

            try {
                $validator->assert($data->$field);
            } catch (NestedValidationException $ex) {
                $errors[$field] = $ex->getMessages();
            }
        }

        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'errors' => $errors
            ]);
            exit;
        }
    }
}

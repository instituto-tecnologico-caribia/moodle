<?php

use GraphQL\Type\Definition\Type;

class UserQuery {
    public static function hello() {

        return [
            'type' => Type::string(),
            'resolve' => fn() => "get_saved_text()"
        ];
    }
}

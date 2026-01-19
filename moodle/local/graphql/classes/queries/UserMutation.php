<?php

use GraphQL\Type\Definition\Type;

class UserMutation {
    public static function saveText() {

        return [
            'type' => Type::boolean(),
            'args' => ['text' => Type::nonNull(Type::string())],
            'resolve' => fn($root, $args) => self::save_text($args['text']) || true
        ];
    }

    private static function save_text($text) {
        set_config('saved_text', $text, 'local_graphql');
    }
}

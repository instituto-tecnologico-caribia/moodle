<?php

use GraphQL\Type\Definition\ObjectType;

class QueryAndMutation {
    public static function query() {
        return new ObjectType([
            'name' => 'Query',
            'fields' =>  [
                'hello' => UserQuery::hello(),
            ]
        ]);
    }
    public static function mutation() {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'saveText' => UserMutation::saveText(),
            ]
        ]);
    }
}

<?php
defined('MOODLE_INTERNAL') || die();

$definitions = array(
    'application' => array(
        'mode' => cache_store::MODE_APPLICATION,
        'component' => 'core',
        'area' => 'application'
    ),
    'session' => array(
        'mode' => cache_store::MODE_SESSION,
        'component' => 'core',
        'area' => 'session'
    ),
    'request' => array(
        'mode' => cache_store::MODE_REQUEST,
        'component' => 'core',
        'area' => 'request'
    )
);

$stores = array(
    'redis_application' => array(
        'name' => 'redis_application',
        'plugin' => 'redis',
        'configuration' => array(
            'server' => 'redis:6379',
            'prefix' => 'mdl_app_',
            'serializer' => Redis::SERIALIZER_PHP,
            'compressor' => Redis::COMPRESSION_NONE
        ),
        'features' => 30,
        'modes' => cache_store::MODE_APPLICATION,
        'default' => true
    )
);

$modemappings = array(
    array(
        'mode' => cache_store::MODE_APPLICATION,
        'store' => 'redis_application',
        'sort' => 1
    )
);

<?php
defined('MOODLE_INTERNAL') || die();

// Cargar el autoloader de Composer primero
$composer_autoload = __DIR__ . '/../vendor/autoload.php';
if (file_exists($composer_autoload)) {
    require_once($composer_autoload);
}

spl_autoload_register(function ($class) {
    $directories = [
        __DIR__ . '/./controllers/',
        __DIR__ . '/./graphql/',
        __DIR__ . '/./graphql/types/',
        __DIR__ . '/./helpers/',
        __DIR__ . '/./validators/',
    ];

    // Buscar la clase en cada directorio
    foreach ($directories as $directory) {
        $file = $directory . $class . '.php';
        if (file_exists($file)) {
            require_once($file);
            return true;
        }
    }

    return false;
});

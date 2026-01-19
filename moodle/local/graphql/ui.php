<?php
define('NO_MOODLE_COOKIES', true);
define('NO_MOODLE_HEADER', true);
require_once(__DIR__ . '/../../config.php');

$endpoint = $CFG->wwwroot . '/local/graphql/endpoint.php';
header('Content-Type: text/html');
echo <<<HTML
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>GraphQL Playground</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css" />
                <script src="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js"></script>
                <style>body{margin:0;height:100vh;}</style>
            </head>
            <body>
                <div id="root" style="height:100vh;"></div>
                <script>
                    window.addEventListener('load', function() {
                        GraphQLPlayground.init(document.getElementById('root'), {
                            endpoint: '$endpoint',
                            settings: { 'request.credentials': 'same-origin' }
                        });
                    });
                </script>
            </body>
        </html> 
    HTML;
exit;

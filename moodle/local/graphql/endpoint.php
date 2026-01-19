<?php

define('NO_MOODLE_COOKIES', true);
define('NO_MOODLE_HEADER', true);

require_once(__DIR__ . '/../../config.php');
require_once(__DIR__ . '/classes/autoloader.php');
require_once(__DIR__ . '/vendor/autoload.php');

header('Content-Type: application/json');

use GraphQL\Type\Schema;
use GraphQL\GraphQL;

try {
	$schema = new Schema(['query' => QueryAndMutation::query(), 'mutation' => QueryAndMutation::mutation()]);
	$input = json_decode(file_get_contents('php://input'),	true);
	$result = GraphQL::executeQuery(
		$schema,
		$input['query'] ?? null,
		null,
		null,
		$input['variables'] ?? null
	);

	echo json_encode($result->toArray(), JSON_PRETTY_PRINT);
	exit;
} catch (\Exception $e) {
	echo json_encode(['errors' => [['message' => $e->getMessage()]]]);
	exit;
}

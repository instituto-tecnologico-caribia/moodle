<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
// moodle/moodle
// moodle/moodle/local/prometheus/metrics.php

/**
 * Publicly accessible endpoint for displaying metrics
 *
 * @package     local_prometheus
 * @copyright   2023 University of Essex
 * @author      John Maydew <jdmayd@essex.ac.uk>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use local_prometheus\gatherer;


// phpcs:ignore moodle.Files.RequireLogin.Missing
require_once(__DIR__ . '/../../config.php');
require_once(__DIR__ . '/locallib.php');


require_login();
global $DB;

$authtoken = get_config('local_prometheus', 'token');
$tokenauthenabled = !empty($authtoken);

// $token = $tokenauthenabled
// ? optional_param('token', '', PARAM_BASE64)
// : required_param('token', PARAM_BASE64);

$timeframe = optional_param('timeframe', 60 * 5, PARAM_INT);

$cutoff = time() - $timeframe;

// if ($tokenauthenabled && $token !== $authtoken) {
//     http_response_code(403);
//     exit;
// }

// header('Content-Type: text/plain');

$gatherer = new gatherer();

function formatPrometheusText(string $raw): string {
    // Normalize whitespace
    $raw = trim(preg_replace('/\s+/', ' ', $raw));

    // Put HELP and TYPE on their own lines
    $raw = preg_replace('/(# HELP [^#]+)/', "\n$1\n", $raw);
    $raw = preg_replace('/(# TYPE [^#]+)/', "\n$1\n", $raw);

    $lines = [];
    $tokens = preg_split('/\n+/', trim($raw));

    foreach ($tokens as $token) {
        $token = trim($token);

        if ($token === '') {
            continue;
        }

        // HELP / TYPE lines stay as-is
        if (str_starts_with($token, '# HELP') || str_starts_with($token, '# TYPE')) {
            $lines[] = $token;
            continue;
        }

        // Extract ALL metric samples from the token
        preg_match_all(
            '/([a-zA-Z_:][a-zA-Z0-9_:]*\{.*?\}\s+-?\d+(?:\.\d+)?)/',
            $token,
            $matches
        );

        foreach ($matches[1] as $metricLine) {
            $lines[] = $metricLine;
        }
    }

    return implode("\n", $lines) . "\n";
}

$prometheusText = $gatherer->output($cutoff);
echo formatPrometheusText($prometheusText);

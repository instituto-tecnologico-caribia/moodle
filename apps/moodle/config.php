<?php
unset($CFG);
global $CFG;
$CFG = new stdClass();

// --- Database configuration ---
$CFG->dbtype    = getenv('DATABASE_TYPE') ?: 'mariadb';
$CFG->dblibrary = 'native';
$CFG->dbhost    = getenv('DATABASE_HOST') ?: 'mariadb';
$CFG->dbname    = getenv('DATABASE_NAME') ?: 'moodle';
$CFG->dbuser    = getenv('DATABASE_USER') ?: 'moodle';
$CFG->dbpass    = getenv('DATABASE_PASSWORD') ?: 'moodle';
$CFG->prefix    = 'mdl_';
$CFG->dboptions = array(
    'dbpersist' => false,
    'dbsocket' => false,
    'dbport' => getenv('DATABASE_PORT') ?: '3306',
    'dbhandlesoptions' => false,
    'dbcollation' => 'utf8mb4_unicode_ci'
);

// --- Moodle paths ---
$CFG->wwwroot = getenv('MOODLE_WWWROOT') ?: 'http://localhost:8080';
$CFG->dataroot  = getenv('MOODLE_DATAROOT') ?: '/var/www/html/moodledata';
$CFG->admin     = 'admin';
$CFG->directorypermissions = 02777;

// --- Extra options ---
$CFG->cachetemplates = false;     // Disables template caching (Mustache)
$CFG->themedesignermode = true; // Set to false for production
$CFG->cachejs = false;

$CFG->debug = 0; // Temporary for debugging
$CFG->debugdisplay = 0; // Temporary for debugging

// --- Theme development settings ---
// Comment these out when not doing theme development
// $CFG->themedesignermode = true;
// $CFG->cachejs = false;
// $CFG->cachetemplates = false;

// --- Redis Cache Configuration ---
$CFG->session_handler_class = '\core\session\redis';
$CFG->session_redis_host = getenv('REDIS_HOST') ?: 'redis';
$CFG->session_redis_port = getenv('REDIS_PORT') ?: 6379;
$CFG->session_redis_database = 0;
$CFG->session_redis_prefix = 'mdl_sess_';
$CFG->session_redis_acquire_lock_timeout = 120;
$CFG->session_redis_lock_expire = 7200;

// Application cache (MUC - Moodle Universal Cache)
$CFG->alternative_cache_factory_class = 'cache_factory';

// --- Load Moodle core ---
require_once(__DIR__ . '/lib/setup.php');

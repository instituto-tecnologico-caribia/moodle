<?php

unset($CFG);  // Ignore this line
global $CFG;  // This is necessary here for PHPUnit execution
$CFG = new stdClass();

//=========================================================================
// 1. DATABASE SETUP
//=========================================================================
// First, you need to configure the database where all Moodle data       //
// will be stored.  This database must already have been created         //
// and a username/password created to access it.                         //

$CFG->dbtype    = 'pgsql';     
$CFG->dblibrary = 'native';    
$CFG->dbhost    = 'localhost'; 
$CFG->dbname    = 'moodle';    
$CFG->dbuser    = 'username';  
$CFG->dbpass    = 'password';  
$CFG->prefix    = 'mdl_';      
$CFG->dboptions = array(       
    'dbpersist' => false,                       
    'dbsocket'  => false,                      
    'dbport'    => '',                        
    'dbhandlesoptions' => false,                                                                                          
    'dbcollation' => 'utf8mb4_unicode_ci'
);


$CFG->wwwroot   = 'http://localhost';  // Full web address to your Moodle site
$CFG->dataroot  = '/Users/brayhandeaza/Documents/dev/projects/caribia/data/moodledata';
$CFG->directorypermissions = 02777;
$CFG->admin = 'admin';


require_once(__DIR__ . '/lib/setup.php'); // Do not edit

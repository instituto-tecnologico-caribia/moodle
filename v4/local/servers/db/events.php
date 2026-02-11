<?php
defined('MOODLE_INTERNAL') || die();

$observers = [
    [
        'eventname' => '\core\event\course_updated',
        'callback'  => '\local_servers\observer::handle_course_event',
    ],
    [
        'eventname' => '\core\event\course_created',
        'callback'  => '\local_servers\observer::handle_course_event',
    ],
];

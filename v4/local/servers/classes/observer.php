<?php

namespace local_servers;

defined('MOODLE_INTERNAL') || die();

class observer {

    public static function handle_course_event(\core\event\base $event) {
        global $DB;

        $courseid = $event->objectid;
        $courserecord = $DB->get_record('course', ['id' => $courseid]);

        // Prepare message for debugging
        $message = '';
        switch ($event->eventname) {
            case '\core\event\course_created':
                $message = "Curso creado: ID {$courseid}, Nombre: {$courserecord->fullname}";
                debugging($message);
                break;
            case '\core\event\course_updated':
                $message = "Curso actualizado: ID {$courseid}, Nombre: {$courserecord->fullname}";
                debugging($message);
                break;
            default:
                return; // skip events we don't care about
        }

        // --- Send webhook ---
        $data = [
            'event' => $event->eventname,
            'courseid' => $courseid,
            'fullname' => $courserecord->fullname,
            'time' => time()
        ];

        // Using Moodle's curl class
        $curl = new \core\curl();
        $options = [
            'body' => json_encode($data),
            'header' => ['Content-Type: application/json'],
            'timeout' => 10
        ];

        try {
            $response = $curl->get('http://localhost:4000');
            debugging("Webhook sent successfully. Response: " . $response);
        } catch (\Exception $e) {
            debugging("Webhook failed: " . $e->getMessage());
        }
    }
}

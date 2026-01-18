<?php

defined('MOODLE_INTERNAL') || die();

class CourseController {

    public static function init($body, $user) {
        switch ($body->action) {
            case 'get_all_assignments':
                self::getAll();
                break;
            case 'create_new_course':
                self::getNewCourse($body, $user);
                break;
            case 'create_new_assignment':
                self::getNewAssignment($body);
                break;

            default:
                break;
        }
    }

    private static function getAll() {
        global $DB;
        $assignments = $DB->get_records("assign");

        echo json_encode($assignments);
        exit;
    }

    private static function getNewAssignment($body) {
        $data = CourseValidator::createAssignment($body->data);

        global $DB;
        $assignments = $DB->get_records("course");

        echo json_encode($assignments);
        exit;
    }

    private static function getNewCourse($body, $user) {
        try {
            global $DB;

            // 1. Validate & prepare course data
            $data = CourseValidator::createCourse($body->data);

            $data->timecreated  = time();
            $data->timemodified = time();
            $data->startdate    = Helpers::toTimestamp($data->startdate);
            $data->enddate      = Helpers::toTimestamp($data->enddate);

            // 2. Create course (Moodle core API)
            $course = create_course($data);

            // 3. Get manual enrol plugin
            $enrolplugin = enrol_get_plugin('manual');
            if (!$enrolplugin) {
                throw new Exception('Manual enrolment plugin is not enabled');
            }

            // 4. Find (or create) manual enrolment instance for the course
            $instances = enrol_get_instances($course->id, true);
            $manualinstance = null;

            foreach ($instances as $instance) {
                if ($instance->enrol === 'manual') {
                    $manualinstance = $instance;
                    break;
                }
            }

            // Create manual enrol instance if missing
            if (!$manualinstance) {
                $instanceid = $enrolplugin->add_instance($course, [
                    'status' => ENROL_INSTANCE_ENABLED
                ]);
                $manualinstance = $DB->get_record('enrol', ['id' => $instanceid], '*', MUST_EXIST);
            }

            // 5. Enrol user properly
            // Default roleid = student (usually 5, but safer to resolve dynamically)
            $studentrole = $DB->get_record('role', ['shortname' => 'student'], '*', MUST_EXIST);
            $enrolplugin->enrol_user(
                $manualinstance,
                $user->id,
                $studentrole->id,
                time(), // timestart
                0       // timeend (0 = no end)
            );

            // 6. Return response
            echo json_encode([
                'success' => true,
                'course'  => $course
            ]);
            exit;
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
            exit;
        }
    }
}

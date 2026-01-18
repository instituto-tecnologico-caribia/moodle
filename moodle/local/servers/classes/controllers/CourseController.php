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
            // $data = CourseValidator::createCourse($body->data);
            $data = $body->data;        
            $data->timecreated = time(); // now
            $data->timemodified = time(); // now

            $course = new stdClass();
            $course->fullname  = $data->fullname;
            $course->shortname = $data->shortname;
            $course->category  = $data->categoryid;
            $course->startdate = Helpers::toTimestamp($data->startdate);
            $course->enddate   = Helpers::toTimestamp($data->enddate);

            $createdCourse = create_course($course);

            // $enrolData = ['enrol' => 'manual', 'status' => '1', 'courseid' => $createdCourse->id, 'sortorder' => $createdCourse->sortorder,];
            // $enrollId = $DB->insert_record("enrol", $enrolData, true);

            // $userEnrolmentData = [
            //     'status' => 0,
            //     'enrolid' => $enrollId,
            //     'userid' => $user->id,
            //     'timestart' => 0,
            //     'timeend' => 0,
            //     'modifierid' => 2,
            //     'timecreated' => time(),
            //     'timemodified' => time()
            // ];
            // $enrollId = $DB->insert_record("user_enrolments", $userEnrolmentData, true);

            echo json_encode($createdCourse);
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

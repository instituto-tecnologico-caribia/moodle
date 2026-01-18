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
            // $data = CourseValidator::createCourse($body->data);
            $data = $body->data;
            $data->startdate =  time();
            $data->enddate = time();
            $data->timecreated = time(); // now
            $data->timemodified = time(); // now

            global $DB;
            $sql = "SELECT * FROM {course} WHERE shortname = :shortname OR idnumber = :idnumber";
            $params = ["shortname" => $data->shortname, "idnumber" => $data->idnumber];
            $exists = $DB->get_record_sql($sql, $params);
            // if ($exists)
            //     throw new Exception('Course already exists');

            $id = $DB->insert_record('course', $data, true);
            if ($id) {
                $sql = "SELECT * FROM {course} WHERE id = :id";
                $course = $DB->get_record_sql($sql, ["id" => $id]);

                $enrolData = ['enrol' => 'manual', 'status' => '1', 'courseid' => $id, 'sortorder' => $course->sortorder,];
                $enrollId = $DB->insert_record("enrol", $enrolData, true);

                global $WEBSERVICES;

                $userEnrolmentData = [
                    'status' => 1,
                    'enrolid' => $enrollId,
                    'userid' => $user->id,
                    'timestart' => 0,
                    'timeend' => 0,
                    'modifierid' => 2,
                    'timecreated' => time(),
                    'timemodified' => time()
                ];
                $enrollId = $DB->insert_record("user_enrolments", $userEnrolmentData, true);

                echo json_encode($course);
                exit;
            }

            throw new Exception('Failed to create course');
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

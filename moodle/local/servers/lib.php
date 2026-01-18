<?php
defined('MOODLE_INTERNAL') || die();

function getNewCourse($body) {
    try {
        $data = CourseValidator::createCourse($body->data);

        // old date to timestamp
        $data->startdate =  new DateTime($data->startdate)->getTimestamp();
        $data->enddate = new DateTime($data->enddate)->getTimestamp();

        global $DB;
        $sql = "SELECT * FROM {course} WHERE shortname = :shortname OR idnumber = :idnumber";
        $params = ["shortname" => $data->shortname, "idnumber" => $data->idnumber];
        $exists = $DB->get_record_sql($sql, $params);
        if ($exists)
            throw new Exception('Course already exists');

        $id = $DB->insert_record('course', $data, true);
        if ($id) {
            $sql = "SELECT * FROM {course} WHERE id = :id";
            $course = $DB->get_record_sql($sql, ["id" => $id]);

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

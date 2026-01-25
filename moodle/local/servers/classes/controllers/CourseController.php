<?php

defined('MOODLE_INTERNAL') || die();

class CourseController {

    public static function init($body, $user) {
        switch ($body->action) {
            case 'get_all_assignments':
                self::getAll("assign");
                break;
            case 'get_course_categories':
                self::getAll("course_categories");
                break;
            case 'create_course_categories':
                self::createCourseCategories($body);
                break;
            case 'create_new_course':
                self::createNewCourse($body, $user);
                break;
            case 'create_new_assignment':
                self::getNewAssignment($body);
                break;


            default:
                break;
        }
    }

    private static function getAll($table) {
        global $DB;
        $elements = $DB->get_records($table);

        echo json_encode($elements);
        exit;
    }

    private static function createCourseCategories($body) {
        try {
            $data = CourseValidator::createCourseCategory($body->data);
            // $data['path'] = '/'. mb_strtolower($data->idnumber, 'UTF-8');

            global $DB;
            $exists = $DB->get_record_sql("SELECT id FROM {course_categories} WHERE idnumber = :idnumber", ['idnumber' => $data->idnumber]);
            if ($exists)
                throw new Exception('Category already exists');

            $categoryId = $DB->insert_record("course_categories", $data, true);
            if ($categoryId) {
                $category = $DB->get_record("course_categories", array("id" => $categoryId));
                echo json_encode($category);
                exit;
            }
            throw new Exception("Failed to create course category");
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
            exit;
        }
    }
    private static function getNewAssignment($body) {
        $data = CourseValidator::createAssignment($body->data);
        global $DB;
        $assignments = $DB->get_records("course");

        echo json_encode($assignments);
        exit;
    }

    private static function createNewCourse($body, $user) {
        try {
            global $DB;

            // 1. Validate & prepare course data
            $data = CourseValidator::createCourse($body->data);
            $data->timecreated  = time();
            $data->timemodified = time();
            $data->startdate    = Helpers::toTimestamp($data->startdate);
            $data->enddate      = Helpers::toTimestamp($data->enddate);

            // echo json_encode(["" => $body->data->image_url]);
            // exit;

            // 2. Create course (Moodle core API)
            $course = create_course($data);

            // OPTIONAL: Set thumbnail from URL
            if ($body->data->image_url) {
                try {
                    Helpers::setCourseThumbnailFromUrl($course->id, $body->data->image_url);
                } catch (Exception $imgex) {
                    // Log but do not fail course creation
                    debugging('Course image error: ' . $imgex->getMessage(), DEBUG_DEVELOPER);
                }
            }

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
            $studentrole = $DB->get_record('role', ['shortname' => 'manager'], '*', MUST_EXIST);
            $enrolplugin->enrol_user(
                $manualinstance,
                $user->id,
                $studentrole->id,
                time(), // timestart
                0       // timeend (0 = no end)
            );

            // 6. Return response
            echo json_encode($course);
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

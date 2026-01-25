<?php
defined('MOODLE_INTERNAL') || die();

use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

class CourseValidator {
    public static function createAssignment($data) {
        // Make defaults a static property
        $defaults = [
            'nosubmissions' => 0,
            'submissiondrafts' => 0,
            'sendnotifications' => 0,
            'sendlatenotifications' => 0,
            'requiresubmissionstatement' => 0,
            'completionsubmit' => 1,
            'teamsubmission' => 0,
            'requireallteammemberssubmit' => 0,
            'teamsubmissiongroupingid' => 0,
            'blindmarking' => 0,
            'hidegrader' => 0,
            'revealidentities' => 0,
            'attemptreopenmethod' => 'none',
            'maxattempts' => '-1',
            'markingworkflow' => 0,
            'markingallocation' => 0,
            'markinganonymous' => 0,
            'sendstudentnotifications' => 1,
            'preventsubmissionnotingroup' => 0,
            'activityformat' => '4',
            'timelimit' => 0,
            'submissionattachments' => 0,
        ];

        // Required fields
        $validators = [
            'course' => v::stringType()->length(1, null),
            'name' => v::stringType()->length(1, null),
            'intro' => v::stringType()->length(1, null),
            'activity' => v::stringType()->length(1, null),

            'allowsubmissionsfromdate' => v::stringType()->length(1, null),
            'duedate' => v::stringType()->length(1, null),
            'cutoffdate' => v::stringType()->length(1, null),
            'gradingduedate' => v::stringType()->length(1, null),
        ];

        // Add optional fields
        foreach ($defaults as $field => $default) {
            $validators[$field] = v::stringType();
        }

        $errors = [];

        // Check for extra fields
        $allowedFields = array_keys($validators);
        $inputFields = array_keys(get_object_vars($data));
        $extraFields = array_diff($inputFields, $allowedFields);
        if (!empty($extraFields)) {
            foreach ($extraFields as $field) {
                $errors[$field][] = "Field '{$field}' is not allowed.";
            }
        }

        // Validate required and optional fields
        foreach ($validators as $field => $validator) {
            if (!property_exists($data, $field)) {
                // Apply default for optional fields
                if (array_key_exists($field, $defaults)) {
                    $data->$field = $defaults[$field];
                    continue;
                }

                $errors[$field][] = "Field '{$field}' is required.";
                continue;
            }

            try {
                $validator->assert($data->$field);
            } catch (NestedValidationException $ex) {
                $errors[$field] = $ex->getMessages();
            }
        }

        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode([
                'errors' => $errors
            ]);
            exit;
        }

        return $data;
    }

    public static function createCourse($data) {
        $defaults = [
            'summaryformat' => "4",
            'format' => 'weeks',
            'showgrades' => 1,        
            'newsitems' => 5,
            'relativedatesmode' => 0,
            'marker' => 0,
            'maxbytes' => 0,
            'legacyfiles' => 0,
            'showreports' => 0,
            'visible' => 1,
            'visibleold' => 1,
            'downloadcontent' => '',
            'groupmode' => 0,
            'groupmodeforce' => 0,
            'defaultgroupingid' => 0,
            'lang' => '',
            'calendartype' => '',
            'theme' => '',
            'requested' => 0,
            'enablecompletion' => 1,
            'completionnotify' => 0,
            'showactivitydates' => 1,
            'showcompletionconditions' => 1,
            'pdfexportfont' => '',
            'image_url' => '',
        ];

        $validators = [
            'fullname'   => v::stringType()->length(1, 255),
            'shortname'  => v::stringType()->length(1, 100),
            'idnumber'   => v::stringType()->length(1, 255),
            'category'   => v::intType()->min(1),
            'startdate'  => v::stringType()->length(1, null),
            'enddate'    => v::stringType()->length(1, null),
            'summary'    => v::stringType()->length(1, null),
        ];

        foreach ($defaults as $field => $_) {
            $validators[$field] = v::stringType();
        }

        return self::validateAndNormalize($data, $validators, $defaults);
    }

    public static function createCourseCategory($data) {
        $defaults = [
            'descriptionformat' => "4",
            'visible' => "1",
            'visibleold' => "1",
            'depth' => "1",            
            "parent" => "0",
            'timemodified' => time(),
        ];

        $validators = [
            'name'   => v::stringType()->length(1, 255),
            'idnumber'   => v::stringType()->length(1, 255),
            'description'  => v::stringType(),
            'parent'   => v::intType()->min(1),        
        ];

        foreach ($defaults as $field => $_) {
            $validators[$field] = v::stringType();
        }

        return self::validateAndNormalize($data, $validators, $defaults);
    }

    private static function validateAndNormalize($data, array $validators, array $defaults) {
        $errors = [];

        $allowedFields = array_keys($validators);
        $inputFields = array_keys(get_object_vars($data));

        // Reject extra fields
        $extraFields = array_diff($inputFields, $allowedFields);
        foreach ($extraFields as $field) {
            $errors[$field][] = "Field '{$field}' is not allowed.";
        }

        // Validate + apply defaults
        foreach ($validators as $field => $validator) {

            if (!property_exists($data, $field)) {
                if (array_key_exists($field, $defaults)) {
                    $data->$field = $defaults[$field];
                    continue;
                }
                $errors[$field][] = "Field '{$field}' is required.";
                continue;
            }

            try {
                $validator->assert($data->$field);
            } catch (NestedValidationException $e) {
                $errors[$field] = $e->getMessages();
            }
        }

        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode(['errors' => $errors]);
            exit;
        }

        return $data;
    }
}

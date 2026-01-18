<?php

class Helpers {
    public static function getWeeklySessionsByRange($startDate, $endDate, $sessionLengthDays = 7, $gapMinutes = 0) {
        $sessions = [];

        $start = new DateTime($startDate);
        $end = new DateTime($endDate);

        $currentStart = clone $start;

        while ($currentStart <= $end) {
            $currentEnd = clone $currentStart;
            $currentEnd->modify('+' . ($sessionLengthDays - 1) . ' days'); // session length

            // Ajustar si sobrepasa la fecha final
            if ($currentEnd > $end) {
                $currentEnd = clone $end;
            }

            $sessions[] = [
                'start' => $currentStart->getTimestamp() * 1000,
                'end'   => $currentEnd->getTimestamp() * 1000,
                'startDate'  => $currentStart->format('Y-m-d-H-i-s'),
                'endDate'    => $currentEnd->format('Y-m-d-H-i-s')
            ];

            // Mover al siguiente inicio, dejando un gap
            $currentStart->modify('+' . $sessionLengthDays . ' days');
            $currentStart->modify('+' . $gapMinutes . ' minutes'); // margen opcional
        }

        return $sessions;
    }

    public static function toTimestamp(string $date): int {
        return (new DateTime($date, new DateTimeZone('UTC')))->getTimestamp();
    }


    public static function setCourseThumbnailFromUrl(int $courseid, string $imageurl): void {
        // Validate URL
        if (!filter_var($imageurl, FILTER_VALIDATE_URL)) {
            throw new Exception('Invalid image URL');
        }

        // Download image (returns STRING)
        $imagedata = download_file_content($imageurl, null, null, false, 20);

        if ($imagedata === false || !is_string($imagedata)) {
            throw new Exception('Failed to download image');
        }

        // Detect mime type
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime  = $finfo->buffer($imagedata);

        $allowed = [
            'image/jpeg' => 'jpg',
            'image/png'  => 'png',
            'image/webp' => 'webp'
        ];

        if (!isset($allowed[$mime])) {
            throw new Exception('Unsupported image type: ' . $mime);
        }

        $extension = $allowed[$mime];

        // Course context
        $context = context_course::instance($courseid);
        $fs = get_file_storage();

        // Remove existing thumbnail
        $fs->delete_area_files(
            $context->id,
            'course',
            'overviewfiles'
        );

        // Save thumbnail
        $filerecord = [
            'contextid' => $context->id,
            'component' => 'course',
            'filearea'  => 'overviewfiles',
            'itemid'    => 0,
            'filepath'  => '/',
            'filename'  => 'course-thumbnail.' . $extension
        ];

        $fs->create_file_from_string($filerecord, $imagedata);
    }
}

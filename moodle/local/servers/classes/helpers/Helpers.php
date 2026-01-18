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
}

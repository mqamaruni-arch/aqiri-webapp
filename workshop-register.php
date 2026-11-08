<?php
declare(strict_types=1);
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');

const SUCCESS_MESSAGE = 'Thank you for your interest in Research Methods in Islamic Studies. We’ve received your registration details. We’ll send payment instructions to the email address and phone number you provided. You’ll also receive the joining instructions through both channels before the workshop.';

function respond(int $status, string $message, array $errors = []): void {
    http_response_code($status);
    $ok = $status >= 200 && $status < 300;
    if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message, 'errors' => (object)$errors], JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-Type: text/html; charset=utf-8');
        $title = $ok ? 'Registration Received' : 'Registration Could Not Be Completed';
        echo '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Workshop Registration | AQIRI</title><body><main style="max-width:720px;margin:60px auto;padding:24px;font:18px/1.7 sans-serif"><h1>' . $title . '</h1><p>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p><a href="on-work-2026-01-registration.html">Return to the registration form</a></main></body></html>';
    }
    exit;
}

function field(string $key, string $label, int $limit = 200): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || strlen($value) > $limit || preg_match('/[\x00-\x1F\x7F]/', $value) || preg_match('//u', $value) !== 1) {
        respond(422, 'Please check the ' . $label . ' field and try again.', [$key => 'Enter a valid ' . $label . '.']);
    }
    return trim($value);
}

function storageError(string $reason): void {
    error_log('AQIRI workshop registration: ' . $reason);
    respond(503, 'We couldn’t save your registration because server storage is unavailable. Please try again or contact events@aqiri.org.');
}

function csvRow($stream, array $row): bool {
    $buffer = fopen('php://temp', 'w+');
    if (!$buffer) return false;
    $encoded = fputcsv($buffer, $row, ',', '"', '');
    rewind($buffer);
    $line = stream_get_contents($buffer);
    fclose($buffer);
    if ($encoded === false || $line === false) return false;
    return @fwrite($stream, $line) === strlen($line);
}

function csvValue(string $value): string {
    return preg_match('/^[=+@\-]/', $value) ? "'" . $value : $value;
}

function flushFile($stream): bool {
    return @fflush($stream) && (!function_exists('fsync') || @fsync($stream));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Please use the workshop registration form to submit your details.');
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 12000) respond(413, 'Your registration is too large. Please shorten your entries and try again.');
if (field('website', 'website') !== '') respond(422, 'This registration could not be accepted. Please contact events@aqiri.org.');

$name = field('name', 'full name');
$email = field('email', 'email address', 254);
$phone = field('phone', 'phone number', 40);
$affiliation = field('affiliation', 'university or institution');
$role = field('academic_role', 'current academic role', 40);
$consent = field('consent', 'consent', 10);
$id = field('submission_id', 'registration reference', 32);
$errors = [];
if ($name === '') $errors['name'] = 'Please enter your full name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
$normalizedPhone = preg_replace('/[\s().-]/', '', $phone);
if (!preg_match('/^\+[1-9][0-9]{6,14}$/', $normalizedPhone)) $errors['phone'] = 'Please include your country code, for example +92, and a phone number with 7–15 digits in total.';
if (!in_array($role, ['', 'BS/MA student', 'MPhil scholar', 'PhD scholar', 'Faculty member', 'Researcher', 'Other'], true)) $errors['academic_role'] = 'Please select one of the listed academic roles.';
if ($consent !== 'yes') $errors['consent'] = 'Please agree to AQIRI using your details for workshop registration and contact.';
if ($id !== '' && !preg_match('/^[a-f0-9]{32}$/', $id)) $errors['submission_id'] = 'Please reload the form and try again.';
if ($errors) respond(422, implode(' ', array_values($errors)), $errors);
if ($id === '') $id = bin2hex(random_bytes(16));

$directory = __DIR__ . '/private-workshop-data';
if (!is_dir($directory) || !is_file($directory . '/.htaccess')) storageError('Protected storage directory is missing.');
$path = $directory . '/workshop-2026-01-registrations.csv';
// A separate lock remains stable when an older CSV schema is migrated atomically.
$lock = @fopen($directory . '/workshop-2026-01-registrations.lock', 'c');
if (!$lock || !@flock($lock, LOCK_EX)) storageError('Cannot lock registration storage.');
@chmod($directory . '/workshop-2026-01-registrations.lock', 0600);
$file = @fopen($path, 'c+');
if (!$file) storageError('Cannot open registration CSV.');
@chmod($path, 0600);
$stat = fstat($file);
if ($stat === false) storageError('Cannot inspect registration CSV.');
$originalSize = $stat['size'];
$headers = $originalSize > 0 ? fgetcsv($file, 0, ',', '"', '') : [];
if (!is_array($headers) || count($headers) !== count(array_unique($headers))) storageError('Registration CSV header is invalid.');
if ($originalSize > 0 && !in_array('Email address', $headers, true)) storageError('Registration CSV schema is unrecognized.');

// A retried POST with the same reference must not append a second registration.
$idColumn = array_search('Registration ID', $headers, true);
if ($idColumn !== false) {
    while (($saved = fgetcsv($file, 0, ',', '"', '')) !== false) {
        if (($saved[$idColumn] ?? '') === $id) {
            $submitted = ['Name' => $name, 'Email address' => $email, 'Phone number' => $phone, 'Institutional affiliation' => $affiliation, 'Current academic role' => $role];
            foreach ($submitted as $column => $value) {
                $index = array_search($column, $headers, true);
                if ($index === false || ($saved[$index] ?? '') !== csvValue($value)) respond(409, 'Your previous registration was saved with different details. To correct it, please contact events@aqiri.org.');
            }
            respond(200, SUCCESS_MESSAGE);
        }
    }
    if (!feof($file)) storageError('Cannot read existing registration IDs.');
}

$row = [
    'Registration ID' => $id,
    'Submitted at (Pakistan Standard Time)' => (new DateTimeImmutable('now', new DateTimeZone('Asia/Karachi')))->format('Y-m-d H:i:s'),
    'Workshop' => 'on-work-2026-01',
    'Name' => $name,
    'Email address' => $email,
    'Phone number' => $phone,
    'Institutional affiliation' => $affiliation,
    'Current academic role' => $role,
    'Consent' => 'Yes'
];
// Prevent spreadsheet formulas when exported CSV data is opened in an office app.
foreach ($row as $key => $value) {
    $row[$key] = csvValue($value);
}
$newHeaders = $headers ?: array_keys($row);
foreach (array_keys($row) as $column) if (!in_array($column, $newHeaders, true)) $newHeaders[] = $column;
$values = array_map(static function ($column) use ($row): string { return $row[$column] ?? ''; }, $newHeaders);

if ($originalSize > 0 && $headers !== $newHeaders) {
    // Preserve every old column and value; only append the new role/reference columns.
    $tempPath = @tempnam($directory, '.registration-');
    if ($tempPath !== false && realpath(dirname($tempPath)) !== realpath($directory)) { @unlink($tempPath); storageError('Cannot create a protected CSV migration file.'); }
    if ($tempPath === false) storageError('Cannot create a CSV migration file.');
    $temp = @fopen($tempPath, 'wb');
    if (!$temp) { @unlink($tempPath); storageError('Cannot open a CSV migration file.'); }
    rewind($file);
    fgetcsv($file, 0, ',', '"', '');
    $ok = csvRow($temp, $newHeaders);
    while ($ok && ($saved = fgetcsv($file, 0, ',', '"', '')) !== false) {
        if ($saved === [null]) continue;
        if (count($saved) !== count($headers)) { $ok = false; break; }
        $ok = csvRow($temp, array_merge($saved, array_fill(0, count($newHeaders) - count($headers), '')));
    }
    $ok = $ok && feof($file) && csvRow($temp, $values) && flushFile($temp);
    fclose($temp);
    fclose($file);
    if (!$ok || !@rename($tempPath, $path)) { @unlink($tempPath); storageError('Cannot migrate the registration CSV safely.'); }
    @chmod($path, 0600);
} else {
    fseek($file, 0, SEEK_END);
    $ok = ($originalSize !== 0 || csvRow($file, $newHeaders)) && csvRow($file, $values) && flushFile($file);
    if (!$ok) { @ftruncate($file, $originalSize); @fflush($file); }
    fclose($file);
    if (!$ok) storageError('Cannot append a registration to the CSV.');
}
flock($lock, LOCK_UN);
fclose($lock);
respond(201, SUCCESS_MESSAGE);

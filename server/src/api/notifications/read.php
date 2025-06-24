<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['error' => 'Anda harus login untuk mengakses sumber daya ini.']);
    exit();
}

$user_id = Auth::getUserId();
$user_type = Auth::getUserType();

try {
    $pdo = Database::connect();

    $sql = "SELECT * FROM notifications WHERE user_identifier = ? AND user_type = ? ORDER BY created_at DESC LIMIT 20";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id, $user_type]);

    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode($notifications);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Tidak dapat mengambil notifikasi.", "details" => $e->getMessage()]);
}

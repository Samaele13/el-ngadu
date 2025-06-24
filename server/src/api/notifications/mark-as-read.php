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
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['notification_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Notification ID tidak ada."]);
    exit();
}

$notification_id = $input['notification_id'];

try {
    $pdo = Database::connect();

    $sql = "UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_identifier = ?";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([$notification_id, $user_id]);

    if ($stmt->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(["message" => "Notifikasi ditandai telah dibaca."]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Gagal memperbarui notifikasi atau notifikasi tidak ditemukan."]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Tidak dapat memperbarui notifikasi.", "details" => $e->getMessage()]);
}
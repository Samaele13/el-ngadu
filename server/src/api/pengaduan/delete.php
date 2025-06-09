<?php

require_once __DIR__ . '/../../components/Database.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID pengaduan wajib disediakan']);
    exit();
}

$id = $_GET['id'];
$pdo = Database::connect();

try {
    $sql = "DELETE FROM pengaduan WHERE id = ?";
    $statement = $pdo->prepare($sql);
    $statement->execute([$id]);

    if ($statement->rowCount() > 0) {
        http_response_code(200);
        echo json_encode(['message' => 'Pengaduan berhasil dihapus']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Pengaduan tidak ditemukan']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal menghapus data: ' . $e->getMessage()]);
}

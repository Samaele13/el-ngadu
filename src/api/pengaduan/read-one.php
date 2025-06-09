<?php
require_once __DIR__ . '/../../components/Database.php';

if (!isset($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'ID pengaduan tidak disediakan.']);
    exit();
}

$id = $_GET['id'];
$pdo = Database::connect();

try {
    $sql = "SELECT * FROM pengaduan WHERE id = ?";
    $statement = $pdo->prepare($sql);

    $statement->execute([$id]);

    // Ambil hasilnya
    $pengaduan = $statement->fetch();

    if ($pengaduan) {
        echo json_encode($pengaduan);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Pengaduan tidak ditemukan.']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal mengambil data: ' . $e->getMessage()]);
}
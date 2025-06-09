<?php

// Panggil file koneksi database
require_once __DIR__ . '/../core/connection.php';

// Beritahu browser bahwa yang akan kita kirim adalah data JSON
header('Content-Type: application/json');

try {
    $statement = $pdo->query("SELECT * FROM pengaduan ORDER BY created_at DESC");

    $pengaduan = $statement->fetchAll();

    // Kembalikan data sebagai JSON
    echo json_encode($pengaduan);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal mengambil data: ' . $e->getMessage()]);
}
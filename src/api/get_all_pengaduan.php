<?php

// Panggil file koneksi database
require_once __DIR__ . '/../../core/connection.php';

// Beritahu browser bahwa yang akan kita kirim adalah data JSON
header('Content-Type: application/json');

try {
    // Query sederhana untuk mengambil semua data dari tabel pengaduan
    $statement = $pdo->query("SELECT * FROM pengaduan ORDER BY created_at DESC");

    // Ambil semua baris data
    $pengaduan = $statement->fetchAll();

    // Kembalikan data sebagai JSON
    echo json_encode($pengaduan);

} catch (PDOException $e) {
    // Jika ada error saat query, kirim response error
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Gagal mengambil data: ' . $e->getMessage()]);
}
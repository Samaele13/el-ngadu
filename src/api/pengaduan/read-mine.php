<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'masyarakat') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Anda harus login sebagai masyarakat untuk melihat riwayat pengaduan.']);
  exit();
}

$nik = Auth::getUserId();
$pdo = Database::connect();

try {
  $sql = "SELECT * FROM pengaduan WHERE nik_masyarakat = ? ORDER BY created_at DESC";
  $statement = $pdo->prepare($sql);
  $statement->execute([$nik]);

  $my_pengaduan = $statement->fetchAll();

  http_response_code(200);
  echo json_encode($my_pengaduan);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal mengambil data: ' . $e->getMessage()]);
}

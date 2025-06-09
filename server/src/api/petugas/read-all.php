<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'petugas' || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Hanya admin yang dapat mengakses sumber daya ini.']);
  exit();
}

$pdo = Database::connect();

try {
  $sql = "SELECT id_petugas, nama_petugas, username, telp, level FROM petugas ORDER BY nama_petugas ASC";
  $statement = $pdo->query($sql);

  $petugas = $statement->fetchAll();

  http_response_code(200);
  echo json_encode($petugas);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal mengambil data petugas: ' . $e->getMessage()]);
}

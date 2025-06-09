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
  $sql = "SELECT nik, nama, username, telp, created_at FROM masyarakat ORDER BY nama ASC";
  $statement = $pdo->query($sql);

  $masyarakat = $statement->fetchAll();

  http_response_code(200);
  echo json_encode($masyarakat);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal mengambil data masyarakat: ' . $e->getMessage()]);
}

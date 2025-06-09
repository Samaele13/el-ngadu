<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'petugas' || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Hanya admin yang dapat melakukan tindakan ini.']);
  exit();
}

if (!isset($_GET['id'])) {
  http_response_code(400);
  echo json_encode(['error' => 'ID petugas wajib disediakan']);
  exit();
}

$id = $_GET['id'];

// Pencegahan agar admin tidak bisa menghapus akunnya sendiri
if ($id == Auth::getUserId()) {
  http_response_code(403);
  echo json_encode(['error' => 'Admin tidak dapat menghapus akunnya sendiri.']);
  exit();
}

$pdo = Database::connect();

try {
  $sql = "DELETE FROM petugas WHERE id_petugas = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$id]);

  if ($statement->rowCount() > 0) {
    http_response_code(200);
    echo json_encode(['message' => 'Akun petugas berhasil dihapus']);
  } else {
    http_response_code(404);
    echo json_encode(['error' => 'Petugas tidak ditemukan']);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal menghapus data petugas: ' . $e->getMessage()]);
}

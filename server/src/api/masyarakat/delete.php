<?php
require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

// Pastikan hanya admin yang bisa mengakses
if (!Auth::isLoggedIn() || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak.']);
  exit();
}

if (!isset($_GET['nik']) || empty(trim($_GET['nik']))) {
  http_response_code(400);
  echo json_encode(['error' => 'NIK masyarakat wajib ada di URL.']);
  exit();
}

$nik = $_GET['nik'];
$pdo = Database::connect();

try {
  $sql = "DELETE FROM masyarakat WHERE nik = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$nik]);

  if ($statement->rowCount() > 0) {
    http_response_code(200);
    echo json_encode(['message' => 'Akun masyarakat berhasil dihapus.']);
  } else {
    http_response_code(404);
    echo json_encode(['error' => 'Akun masyarakat tidak ditemukan.']);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal menghapus data: ' . $e->getMessage()]);
}

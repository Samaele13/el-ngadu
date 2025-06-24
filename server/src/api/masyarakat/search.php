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

if (!isset($_GET['q']) || empty(trim($_GET['q']))) {
  http_response_code(400);
  echo json_encode(['error' => 'Query pencarian "q" dibutuhkan.']);
  exit();
}

$query = '%' . $_GET['q'] . '%';
$pdo = Database::connect();

try {
  $sql = "SELECT nik, nama, username, telp, created_at FROM masyarakat WHERE nama LIKE ? OR username LIKE ? OR nik LIKE ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$query, $query, $query]);
  $results = $statement->fetchAll();

  http_response_code(200);
  echo json_encode($results);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal melakukan pencarian: ' . $e->getMessage()]);
}

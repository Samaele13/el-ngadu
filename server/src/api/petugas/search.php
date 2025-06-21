<?php
require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak.']);
  exit();
}

if (!isset($_GET['q'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Query pencarian "q" dibutuhkan.']);
  exit();
}

$query = '%' . $_GET['q'] . '%';
$pdo = Database::connect();

try {
  $sql = "SELECT id_petugas, nama_petugas, username, telp, level FROM petugas WHERE nama_petugas LIKE ? OR username LIKE ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$query, $query]);
  $results = $statement->fetchAll();

  http_response_code(200);
  echo json_encode($results);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal melakukan pencarian: ' . $e->getMessage()]);
}

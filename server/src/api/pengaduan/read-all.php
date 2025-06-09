<?php

require_once __DIR__ . '/../../components/Database.php';

$pdo = Database::connect();

try {
  $statement = $pdo->query("SELECT * FROM pengaduan ORDER BY created_at DESC");
  $pengaduan = $statement->fetchAll();

  echo json_encode($pengaduan);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal mengambil data: ' . $e->getMessage()]);
}

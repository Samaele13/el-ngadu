<?php

require_once __DIR__ . '/../../components/Database.php';

if (!isset($_GET['id'])) {
  http_response_code(400);
  echo json_encode(['error' => 'ID pengaduan wajib disediakan']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['status']) || !in_array($input['status'], ['diajukan', 'diproses', 'selesai'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Status tidak valid atau tidak disediakan']);
  exit();
}

$id = $_GET['id'];
$status = $input['status'];
$pdo = Database::connect();

try {
  $sql = "UPDATE pengaduan SET status = ? WHERE id = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$status, $id]);

  if ($statement->rowCount() > 0) {
    http_response_code(200);
    echo json_encode(['message' => 'Status pengaduan berhasil diperbarui']);
  } else {
    http_response_code(404);
    echo json_encode(['error' => 'Pengaduan tidak ditemukan atau status tidak berubah']);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal memperbarui data: ' . $e->getMessage()]);
}

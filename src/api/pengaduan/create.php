<?php

require_once __DIR__ . '/../../components/Database.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405); // Method Not Allowed
  echo json_encode(['error' => 'Metode tidak diizinkan, gunakan POST.']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['judul']) || !isset($input['isi']) || empty(trim($input['judul']))) {
  http_response_code(400); // Bad Request
  echo json_encode(['error' => 'Input tidak valid. Judul dan isi tidak boleh kosong.']);
  exit();
}

$judul = trim($input['judul']);
$isi = trim($input['isi']);
$pdo = Database::connect();

try {
  $sql = "INSERT INTO pengaduan (judul, isi) VALUES (?, ?)";
  $statement = $pdo->prepare($sql);

  $statement->execute([$judul, $isi]);

  http_response_code(201); // 201 Created adalah status code yang tepat untuk POST yang berhasil
  echo json_encode(['message' => 'Pengaduan berhasil dibuat.']);
} catch (PDOException $e) {
  http_response_code(500); // Internal Server Error
  echo json_encode(['error' => 'Gagal menyimpan data ke database: ' . $e->getMessage()]);
}

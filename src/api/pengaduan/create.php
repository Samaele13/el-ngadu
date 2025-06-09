<?php

require_once __DIR__ . '/../../components/Database.php';
require_once __DIR__ . '/../../components/Auth.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'masyarakat') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Anda harus login sebagai masyarakat.']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['judul'], $input['isi']) || empty(trim($input['judul']))) {
  http_response_code(400);
  echo json_encode(['error' => 'Input tidak valid. Judul dan isi tidak boleh kosong.']);
  exit();
}

$judul = trim($input['judul']);
$isi = trim($input['isi']);
$nik = Auth::getUserId();

$pdo = Database::connect();

try {
  $sql = "INSERT INTO pengaduan (judul, isi, nik_masyarakat) VALUES (?, ?, ?)";
  $statement = $pdo->prepare($sql);

  $statement->execute([$judul, $isi, $nik]);

  http_response_code(201);
  echo json_encode(['message' => 'Pengaduan berhasil dibuat.']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal menyimpan data ke database: ' . $e->getMessage()]);
}

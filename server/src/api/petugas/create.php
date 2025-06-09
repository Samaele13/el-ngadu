<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'petugas' || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Hanya admin yang dapat melakukan tindakan ini.']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (
  !isset($input['nama_petugas'], $input['username'], $input['password'], $input['telp'], $input['level']) ||
  empty(trim($input['nama_petugas'])) ||
  empty(trim($input['username'])) ||
  empty($input['password']) ||
  !in_array($input['level'], ['admin', 'petugas'])
) {
  http_response_code(400);
  echo json_encode(['error' => 'Input tidak valid. Semua field wajib diisi dan level harus "admin" atau "petugas".']);
  exit();
}

$nama_petugas = $input['nama_petugas'];
$username = $input['username'];
$password = $input['password'];
$telp = $input['telp'];
$level = $input['level'];

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

$pdo = Database::connect();

try {
  $sql = "INSERT INTO petugas (nama_petugas, username, password, telp, level) VALUES (?, ?, ?, ?, ?)";
  $statement = $pdo->prepare($sql);
  $statement->execute([$nama_petugas, $username, $hashed_password, $telp, $level]);

  http_response_code(201);
  echo json_encode(['message' => 'Akun petugas baru berhasil dibuat.']);
} catch (PDOException $e) {
  if ($e->getCode() === '23000') {
    http_response_code(409);
    echo json_encode(['error' => 'Username sudah terdaftar.']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal membuat akun petugas: ' . $e->getMessage()]);
  }
}

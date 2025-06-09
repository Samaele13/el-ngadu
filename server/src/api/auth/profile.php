<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn()) {
  http_response_code(401);
  echo json_encode(['error' => 'Anda harus login untuk mengakses sumber daya ini.']);
  exit();
}

$user_id = Auth::getUserId();
$user_type = Auth::getUserType();

$pdo = Database::connect();
$user_data = null;

try {
  if ($user_type === 'masyarakat') {
    $sql = "SELECT nik, nama, username, telp FROM masyarakat WHERE nik = ?";
  } elseif ($user_type === 'petugas') {
    $sql = "SELECT id_petugas, nama_petugas, username, telp, level FROM petugas WHERE id_petugas = ?";
  } else {
    throw new Exception("Tipe user tidak valid dalam sesi.");
  }

  $statement = $pdo->prepare($sql);
  $statement->execute([$user_id]);
  $user_data = $statement->fetch();

  if (!$user_data) {
    http_response_code(404);
    echo json_encode(['error' => 'Data pengguna tidak ditemukan.']);
    exit();
  }

  http_response_code(200);
  echo json_encode(['user' => $user_data]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
}

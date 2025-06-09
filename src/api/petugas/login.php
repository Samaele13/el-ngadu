<?php

require_once __DIR__ . '/../../components/Database.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['password'])) {
  http_response_code(400);
  echo json_encode(['debug_step' => 'error', 'message' => 'Input username atau password tidak ada.']);
  exit();
}

$username = $input['username'];
$password = $input['password'];
$pdo = Database::connect();

try {
  $sql = "SELECT * FROM petugas WHERE username = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$username]);
  $petugas = $statement->fetch();

  if (!$petugas) {
    http_response_code(401);
    echo json_encode([
      'debug_step' => 'user_check',
      'message' => 'User dengan username ini tidak ditemukan di tabel petugas.',
      'username_sent' => $username
    ]);
    exit();
  }

  $password_from_db = $petugas['password'];
  $is_password_correct = password_verify($password, $password_from_db);

  echo json_encode([
    'debug_step' => 'password_verification',
    'message' => 'Hasil verifikasi password.',
    'password_is_correct' => $is_password_correct,
    'password_sent' => $password,
    'password_hash_from_db' => $password_from_db
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['debug_step' => 'database_error', 'message' => $e->getMessage()]);
}

<?php

require_once __DIR__ . '/../../components/Database.php';
require_once __DIR__ . '/../../components/Auth.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['password'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Username dan password wajib diisi.']);
  exit();
}

$username = $input['username'];
$password = $input['password'];
$pdo = Database::connect();

try {

  $sql = "SELECT nik, nama, username, password, telp FROM masyarakat WHERE username = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$username]);
  $user = $statement->fetch();

  if ($user && password_verify($password, $user['password'])) {
    Auth::login($user, 'masyarakat');

    http_response_code(200);
    echo json_encode([
      'message' => 'Login berhasil.',
      'user' => [
        'nik' => $user['nik'],
        'nama' => $user['nama'],
        'username' => $user['username'],
        'telp' => $user['telp']
      ]
    ]);
  } else {
    http_response_code(401);
    echo json_encode(['error' => 'akun tidak ditemukan.']);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal melakukan login: ' . $e->getMessage()]);
}

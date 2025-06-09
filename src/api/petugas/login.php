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
  $sql = "SELECT * FROM petugas WHERE username = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute([$username]);
  $petugas = $statement->fetch();

  if ($petugas && password_verify($password, $petugas['password'])) {
    Auth::login($petugas, 'petugas');

    http_response_code(200);
    echo json_encode([
      'message' => 'Login petugas berhasil.',
      'petugas' => [
        'id_petugas' => $petugas['id_petugas'],
        'nama_petugas' => $petugas['nama_petugas'],
        'username' => $petugas['username'],
        'level' => $petugas['level']
      ]
    ]);
  } else {
    http_response_code(401);
    echo json_encode(['error' => 'Kredensial tidak valid.']);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal melakukan login: ' . $e->getMessage()]);
}

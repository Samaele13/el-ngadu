<?php
require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn()) {
  http_response_code(401);
  echo json_encode(['error' => 'Anda harus login untuk melakukan tindakan ini.']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['old_password'], $input['new_password']) || empty($input['old_password']) || empty($input['new_password'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Password lama dan baru wajib diisi.']);
  exit();
}

if (strlen($input['new_password']) < 8) {
  http_response_code(400);
  echo json_encode(['error' => 'Password baru harus minimal 8 karakter.']);
  exit();
}

$user_id = Auth::getUserId();
$user_type = Auth::getUserType();
$pdo = Database::connect();

try {
  if ($user_type === 'masyarakat') {
    $table = 'masyarakat';
    $id_column = 'nik';
  } elseif ($user_type === 'petugas') {
    $table = 'petugas';
    $id_column = 'id_petugas';
  } else {
    throw new Exception("Tipe pengguna tidak valid.", 500);
  }

  $sql_get = "SELECT password FROM {$table} WHERE {$id_column} = ?";
  $stmt_get = $pdo->prepare($sql_get);
  $stmt_get->execute([$user_id]);
  $user_data = $stmt_get->fetch();

  if (!$user_data) {
    throw new Exception("Pengguna tidak ditemukan.", 404);
  }

  if (!password_verify($input['old_password'], $user_data['password'])) {
    throw new Exception("Password lama yang Anda masukkan salah.", 401);
  }

  $new_password_hash = password_hash($input['new_password'], PASSWORD_DEFAULT);
  $sql_update = "UPDATE {$table} SET password = ? WHERE {$id_column} = ?";
  $stmt_update = $pdo->prepare($sql_update);
  $stmt_update->execute([$new_password_hash, $user_id]);

  http_response_code(200);
  echo json_encode(['message' => 'Password berhasil diperbarui.']);
} catch (Exception $e) {
  $code = in_array($e->getCode(), [400, 401, 404]) ? $e->getCode() : 500;
  http_response_code($code);
  echo json_encode(['error' => $e->getMessage()]);
}

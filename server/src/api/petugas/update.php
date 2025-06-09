<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'petugas' || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Hanya admin yang dapat melakukan tindakan ini.']);
  exit();
}

if (!isset($_GET['id'])) {
  http_response_code(400);
  echo json_encode(['error' => 'ID petugas wajib disediakan']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$id = $_GET['id'];
$pdo = Database::connect();

$fields = [];
$params = [];

if (isset($input['nama_petugas'])) {
  $fields[] = 'nama_petugas = ?';
  $params[] = $input['nama_petugas'];
}
if (isset($input['username'])) {
  $fields[] = 'username = ?';
  $params[] = $input['username'];
}
if (isset($input['telp'])) {
  $fields[] = 'telp = ?';
  $params[] = $input['telp'];
}
if (isset($input['level']) && in_array($input['level'], ['admin', 'petugas'])) {
  $fields[] = 'level = ?';
  $params[] = $input['level'];
}

if (empty($fields)) {
  http_response_code(400);
  echo json_encode(['error' => 'Tidak ada data yang dikirim untuk diperbarui.']);
  exit();
}

$params[] = $id;

try {
  $sql = "UPDATE petugas SET " . implode(', ', $fields) . " WHERE id_petugas = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute($params);

  if ($statement->rowCount() > 0) {
    http_response_code(200);
    echo json_encode(['message' => 'Data petugas berhasil diperbarui']);
  } else {
    http_response_code(404);
    echo json_encode(['error' => 'Petugas tidak ditemukan atau data tidak berubah']);
  }
} catch (PDOException $e) {
  if ($e->getCode() === '23000') {
    http_response_code(409);
    echo json_encode(['error' => 'Username sudah digunakan.']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal memperbarui data petugas: ' . $e->getMessage()]);
  }
}

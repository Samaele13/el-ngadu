<?php
require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';
require_once __DIR__ . '/../../components/NotificationManager.php';

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

$id = $_GET['id'];
$input = json_decode(file_get_contents('php://input'), true);
$pdo = Database::connect();

$fields = [];
$params = [];

if (isset($input['nama_petugas'])) {
  $fields[] = 'nama_petugas = ?';
  $params[] = trim($input['nama_petugas']);
}
if (isset($input['username'])) {
  $fields[] = 'username = ?';
  $params[] = trim($input['username']);
}
if (isset($input['telp'])) {
  $fields[] = 'telp = ?';
  $params[] = trim($input['telp']);
}
if (isset($input['level']) && in_array($input['level'], ['admin', 'petugas'])) {
  $fields[] = 'level = ?';
  $params[] = $input['level'];
}
if (isset($input['password']) && !empty($input['password'])) {
  if (strlen($input['password']) < 8) {
    http_response_code(400);
    echo json_encode(['error' => 'Password baru harus minimal 8 karakter.']);
    exit();
  }
  $fields[] = 'password = ?';
  $params[] = password_hash($input['password'], PASSWORD_DEFAULT);
}

if (empty($fields)) {
  http_response_code(400);
  echo json_encode(['error' => 'Tidak ada data yang dikirim untuk diperbarui.']);
  exit();
}

$params[] = $id;

try {
  $pdo->beginTransaction();

  $sql = "UPDATE petugas SET " . implode(', ', $fields) . " WHERE id_petugas = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute($params);

  if ($statement->rowCount() > 0) {

    $message = "Data profil Anda telah diperbarui oleh admin.";
    $link = "/dashboard/profil";
    NotificationManager::create($pdo, $id, 'petugas', $message, $link);

    $pdo->commit();
    http_response_code(200);
    echo json_encode(['message' => 'Data petugas berhasil diperbarui']);
  } else {
    $pdo->rollBack();
    http_response_code(404);
    echo json_encode(['error' => 'Petugas tidak ditemukan atau data tidak berubah']);
  }
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  if ($e->getCode() === '23000') {
    http_response_code(409);
    echo json_encode(['error' => 'Username sudah digunakan.']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal memperbarui data petugas: ' . $e->getMessage()]);
  }
}

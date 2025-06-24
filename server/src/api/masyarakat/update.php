<?php
require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';
require_once __DIR__ . '/../../components/NotificationManager.php';

Auth::startSession();

if (!Auth::isLoggedIn() || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak.']);
  exit();
}

if (!isset($_GET['nik'])) {
  http_response_code(400);
  echo json_encode(['error' => 'NIK masyarakat wajib ada di URL.']);
  exit();
}

$nik = $_GET['nik'];
$input = json_decode(file_get_contents('php://input'), true);
$pdo = Database::connect();

$fields = [];
$params = [];

if (isset($input['nama'])) {
  $fields[] = 'nama = ?';
  $params[] = trim($input['nama']);
}
if (isset($input['username'])) {
  $fields[] = 'username = ?';
  $params[] = trim($input['username']);
}
if (isset($input['telp'])) {
  $fields[] = 'telp = ?';
  $params[] = trim($input['telp']);
}

if (empty($fields)) {
  http_response_code(400);
  echo json_encode(['error' => 'Tidak ada data yang dikirim untuk diperbarui.']);
  exit();
}

$params[] = $nik;

try {
  $pdo->beginTransaction();

  $sql = "UPDATE masyarakat SET " . implode(', ', $fields) . " WHERE nik = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute($params);

  if ($statement->rowCount() > 0) {
    // Buat notifikasi untuk masyarakat yang datanya diubah
    $message = "Data profil Anda telah diperbarui oleh admin.";
    $link = "/dashboard/profil";
    NotificationManager::create($pdo, $nik, 'masyarakat', $message, $link);

    $pdo->commit();
    http_response_code(200);
    echo json_encode(['message' => 'Data masyarakat berhasil diperbarui.']);
  } else {
    $pdo->rollBack();
    http_response_code(404);
    echo json_encode(['error' => 'Masyarakat tidak ditemukan atau data tidak berubah.']);
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
    echo json_encode(['error' => 'Gagal memperbarui data: ' . $e->getMessage()]);
  }
}

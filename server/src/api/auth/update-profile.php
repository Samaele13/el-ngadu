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

$user_id = Auth::getUserId();
$user_type = Auth::getUserType();
$pdo = Database::connect();

$fields = [];
$params = [];
$session_update_data = [];

// Tentukan tabel dan kolom ID berdasarkan tipe pengguna
if ($user_type === 'masyarakat') {
  $table = 'masyarakat';
  $id_column = 'nik';
  if (isset($input['nama'])) {
    $fields[] = 'nama = ?';
    $params[] = trim($input['nama']);
    $session_update_data['nama'] = trim($input['nama']);
  }
} elseif ($user_type === 'petugas') {
  $table = 'petugas';
  $id_column = 'id_petugas';
  if (isset($input['nama_petugas'])) {
    $fields[] = 'nama_petugas = ?';
    $params[] = trim($input['nama_petugas']);
    $session_update_data['nama_petugas'] = trim($input['nama_petugas']);
  }
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Tipe pengguna tidak valid.']);
  exit();
}

// Kolom yang bisa diubah oleh semua peran
if (isset($input['username'])) {
  $fields[] = 'username = ?';
  $params[] = trim($input['username']);
  $session_update_data['username'] = trim($input['username']);
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

$params[] = $user_id;

try {
  $sql = "UPDATE {$table} SET " . implode(', ', $fields) . " WHERE {$id_column} = ?";
  $statement = $pdo->prepare($sql);
  $statement->execute($params);

  if ($statement->rowCount() > 0) {
    // Perbarui data di sesi agar langsung tercermin di UI
    foreach ($session_update_data as $key => $value) {
      $_SESSION[$key] = $value;
    }

    http_response_code(200);
    echo json_encode(['message' => 'Profil berhasil diperbarui.']);
  } else {
    http_response_code(404);
    echo json_encode(['error' => 'Pengguna tidak ditemukan atau data tidak berubah.']);
  }
} catch (PDOException $e) {
  if ($e->getCode() === '23000') {
    http_response_code(409);
    echo json_encode(['error' => 'Username sudah digunakan.']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal memperbarui profil: ' . $e->getMessage()]);
  }
}

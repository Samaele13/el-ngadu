<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'masyarakat') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Anda harus login sebagai masyarakat.']);
  exit();
}

if (!isset($_POST['judul'], $_POST['isi']) || empty(trim($_POST['judul']))) {
  http_response_code(400);
  echo json_encode(['error' => 'Input tidak valid. Judul dan isi wajib diisi.']);
  exit();
}

$judul = trim($_POST['judul']);
$isi = trim($_POST['isi']);
$nik = Auth::getUserId();
$foto_path = null;

if (isset($_FILES['foto_bukti']) && $_FILES['foto_bukti']['error'] === UPLOAD_ERR_OK) {
  $file = $_FILES['foto_bukti'];
  $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
  $file_name = uniqid('img_', true) . '.' . $file_extension;

  $upload_dir = 'uploads/';
  $upload_path = $upload_dir . $file_name;

  $public_folder_path = __DIR__ . '/../../../public/';

  if (!is_dir($public_folder_path . $upload_dir)) {
    mkdir($public_folder_path . $upload_dir, 0777, true);
  }

  if (move_uploaded_file($file['tmp_name'], $public_folder_path . $upload_path)) {
    $foto_path = '/' . $upload_path;
  }
}

$pdo = Database::connect();

try {
  $sql = "INSERT INTO pengaduan (judul, isi, nik_masyarakat, foto_bukti) VALUES (?, ?, ?, ?)";
  $statement = $pdo->prepare($sql);
  $statement->execute([$judul, $isi, $nik, $foto_path]);

  http_response_code(201);
  echo json_encode(['message' => 'Pengaduan berhasil dibuat.']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal menyimpan data: ' . $e->getMessage()]);
}

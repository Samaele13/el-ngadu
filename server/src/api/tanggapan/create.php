<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || !in_array(Auth::getUserType(), ['petugas', 'admin'])) {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Hanya petugas atau admin yang dapat memberikan tanggapan.']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id_pengaduan'], $input['isi_tanggapan']) || empty(trim($input['isi_tanggapan']))) {
  http_response_code(400);
  echo json_encode(['error' => 'Input tidak valid. ID Pengaduan dan isi tanggapan tidak boleh kosong.']);
  exit();
}

$id_pengaduan = $input['id_pengaduan'];
$isi_tanggapan = $input['isi_tanggapan'];
$id_petugas = Auth::getUserId();

$pdo = Database::connect();

try {
  $pdo->beginTransaction();

  $sql_insert = "INSERT INTO tanggapan (id_pengaduan, id_petugas, isi_tanggapan) VALUES (?, ?, ?)";
  $stmt_insert = $pdo->prepare($sql_insert);
  $stmt_insert->execute([$id_pengaduan, $id_petugas, $isi_tanggapan]);

  $sql_update = "UPDATE pengaduan SET status = 'selesai' WHERE id = ?";
  $stmt_update = $pdo->prepare($sql_update);
  $stmt_update->execute([$id_pengaduan]);

  $pdo->commit();

  http_response_code(201);
  echo json_encode(['message' => 'Tanggapan berhasil dikirim dan status pengaduan telah diubah menjadi "selesai".']);
} catch (PDOException $e) {
  $pdo->rollBack();
  http_response_code(500);
  echo json_encode(['error' => 'Gagal menyimpan tanggapan: ' . $e->getMessage()]);
}

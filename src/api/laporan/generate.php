<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || Auth::getUserType() !== 'petugas' || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Hanya admin yang dapat membuat laporan.']);
  exit();
}

$pdo = Database::connect();

try {
  $sql = "
        SELECT
            p.id,
            p.judul,
            p.isi,
            p.status,
            p.created_at AS tgl_pengaduan,
            m.nik AS nik_pelapor,
            m.nama AS nama_pelapor,
            t.id_tanggapan,
            t.tgl_tanggapan,
            t.isi_tanggapan,
            pt.nama_petugas AS nama_petugas_penanggap
        FROM
            pengaduan p
        JOIN
            masyarakat m ON p.nik_masyarakat = m.nik
        LEFT JOIN
            tanggapan t ON p.id = t.id_pengaduan
        LEFT JOIN
            petugas pt ON t.id_petugas = pt.id_petugas
        ORDER BY
            p.created_at DESC
    ";

  $statement = $pdo->query($sql);
  $laporan = $statement->fetchAll();

  http_response_code(200);
  echo json_encode($laporan);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal membuat laporan: ' . $e->getMessage()]);
}

<?php
require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak. Hanya admin yang bisa mengakses statistik ini.']);
  exit();
}

$pdo = Database::connect();

try {
  // Hitung total pengaduan berdasarkan status
  $pengaduanSql = "
        SELECT
            COUNT(CASE WHEN status = 'diajukan' THEN 1 END) AS diajukan,
            COUNT(CASE WHEN status = 'diproses' THEN 1 END) AS diproses,
            COUNT(CASE WHEN status = 'selesai' THEN 1 END) AS selesai
        FROM pengaduan
    ";
  $pengaduanStmt = $pdo->query($pengaduanSql);
  $pengaduanStats = $pengaduanStmt->fetch(PDO::FETCH_ASSOC);

  // Hitung total pengguna
  $masyarakatCount = $pdo->query("SELECT COUNT(*) FROM masyarakat")->fetchColumn();
  $petugasCount = $pdo->query("SELECT COUNT(*) FROM petugas")->fetchColumn();

  $stats = [
    'pengaduan_diajukan' => (int)$pengaduanStats['diajukan'],
    'pengaduan_diproses' => (int)$pengaduanStats['diproses'],
    'pengaduan_selesai' => (int)$pengaduanStats['selesai'],
    'total_masyarakat' => (int)$masyarakatCount,
    'total_petugas' => (int)$petugasCount
  ];

  http_response_code(200);
  echo json_encode($stats);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal mengambil data statistik admin: ' . $e->getMessage()]);
}

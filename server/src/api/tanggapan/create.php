<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';
require_once __DIR__ . '/../../components/NotificationManager.php';

Auth::startSession();

if (!Auth::isLoggedIn() || !in_array(Auth::getUserType(), ['petugas', 'admin'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Akses ditolak.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id_pengaduan'], $input['isi_tanggapan']) || empty(trim($input['isi_tanggapan']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Input tidak valid.']);
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


    $stmt_get_nik = $pdo->prepare("SELECT nik_masyarakat FROM pengaduan WHERE id = ?");
    $stmt_get_nik->execute([$id_pengaduan]);
    $pengaduan = $stmt_get_nik->fetch(PDO::FETCH_ASSOC);

    if ($pengaduan) {
        $nik_masyarakat = $pengaduan['nik_masyarakat'];
        $message = "Petugas telah menanggapi laporan Anda #" . $id_pengaduan . ".";
        $link = "/dashboard/riwayat/" . $id_pengaduan;
        NotificationManager::create($pdo, $nik_masyarakat, 'masyarakat', $message, $link);
    }

    $pdo->commit();

    http_response_code(201);
    echo json_encode(['message' => 'Tanggapan berhasil dikirim.']);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['error' => 'Gagal menyimpan tanggapan: ' . $e->getMessage()]);
}

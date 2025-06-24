<?php

require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';
require_once __DIR__ . '/../../components/NotificationManager.php';

Auth::startSession();

if (!Auth::isLoggedIn() || !in_array(Auth::getUserType(), ['petugas', 'admin'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Akses ditolak. Hanya petugas atau admin yang dapat mengubah status.']);
    exit();
}

// AMBIL ID DARI URL, BUKAN DARI BODY
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID Pengaduan wajib ada di URL.']);
    exit();
}

$id_pengaduan = $_GET['id'];
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['status']) || empty(trim($input['status']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Input tidak valid. Status tidak boleh kosong.']);
    exit();
}

$new_status = $input['status'];
$pdo = Database::connect();

try {
    $pdo->beginTransaction();

    // Pastikan pengaduan ada sebelum diupdate
    $stmt_check = $pdo->prepare("SELECT nik_masyarakat FROM pengaduan WHERE id = ?");
    $stmt_check->execute([$id_pengaduan]);
    $pengaduan = $stmt_check->fetch();

    if (!$pengaduan) {
        throw new Exception("Pengaduan tidak ditemukan.", 404);
    }

    $sql_update = "UPDATE pengaduan SET status = ? WHERE id = ?";
    $stmt_update = $pdo->prepare($sql_update);
    $stmt_update->execute([$new_status, $id_pengaduan]);

    $nik_masyarakat = $pengaduan['nik_masyarakat'];
    $message = "Status laporan Anda #" . $id_pengaduan . " telah diubah menjadi '" . htmlspecialchars($new_status) . "'.";
    $link = "/dashboard/riwayat/" . $id_pengaduan;

    NotificationManager::create($pdo, $nik_masyarakat, 'masyarakat', $message, $link);

    $pdo->commit();

    http_response_code(200);
    echo json_encode(['message' => 'Status pengaduan berhasil diubah.']);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    // Kirim kode status yang sesuai jika ada
    $code = $e->getCode() === 404 ? 404 : 500;
    http_response_code($code);
    echo json_encode(['error' => $e->getMessage()]);
}

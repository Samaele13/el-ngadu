<?php

require_once __DIR__ . '/../../components/Database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (
    !isset($input['nik'], $input['nama'], $input['username'], $input['password'], $input['telp']) ||
    empty(trim($input['nik'])) ||
    empty(trim($input['nama'])) ||
    empty(trim($input['username'])) ||
    empty($input['password'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Semua field wajib diisi.']);
    exit();
}

$nik = $input['nik'];
$nama = $input['nama'];
$username = $input['username'];
$password = $input['password'];
$telp = $input['telp'];

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

$pdo = Database::connect();

try {
    $sql = "INSERT INTO masyarakat (nik, nama, username, password, telp) VALUES (?, ?, ?, ?, ?)";
    $statement = $pdo->prepare($sql);
    $statement->execute([$nik, $nama, $username, $hashed_password, $telp]);

    http_response_code(201);
    echo json_encode(['message' => 'Registrasi berhasil.']);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        http_response_code(409);
        echo json_encode(['error' => 'NIK atau Username sudah terdaftar.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Gagal melakukan registrasi: ' . $e->getMessage()]);
    }
}

<?php

// Memanggil file koneksi sekali saja di pintu masuk utama
require_once __DIR__ . '/../src/core/connection.php';

header('Content-Type: application/json');

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($request_uri) {
  case '/api/pengaduan':
    require __DIR__ . '/../src/api/get_all_pengaduan.php';
    break;

  // Anda bisa menambahkan rute lain di sini di masa depan

  default:
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint tidak ditemukan']);
    break;
}

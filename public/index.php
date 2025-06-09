<?php

// Memanggil file koneksi sekali saja di pintu masuk utama
require_once __DIR__ . '/../src/core/connection.php';

// Mengatur header default untuk semua respons adalah JSON
header('Content-Type: application/json');

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Ini adalah router kita
switch ($request_uri) {
  // Rute untuk mengambil semua data pengaduan
  case '/api/pengaduan':
    require __DIR__ . '/../src/api/get_all_pengaduan.php';
    break;

  // Anda bisa menambahkan rute lain di sini di masa depan
  // case '/api/users':
  //     require __DIR__ . '/../src/api/get_all_users.php';
  //     break;

  // Jika tidak ada rute yang cocok
  default:
    http_response_code(404); // Set status code Not Found
    echo json_encode(['error' => 'Endpoint tidak ditemukan']);
    break;
}

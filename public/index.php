<?php

header('Content-Type: application/json');

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

// Routing
if ($request_uri === '/api/pengaduan') {
  if ($request_method === 'GET') {
    // Jika metodenya GET, panggil file untuk membaca semua data
    require __DIR__ . '/../src/api/pengaduan/read-all.php';
  } elseif ($request_method === 'POST') {
    // Jika metodenya POST, panggil file untuk membuat data baru
    // require __DIR__ . '/../src/api/pengaduan/create.php';
  }
} else {
  http_response_code(404);
  echo json_encode(['error' => 'Endpoint tidak ditemukan']);
}

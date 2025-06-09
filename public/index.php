<?php

header('Content-Type: application/json');

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_uri === '/api/pengaduan') {
  switch ($request_method) {
    case 'GET':
      if (isset($_GET['id'])) {
        require __DIR__ . '/../src/api/pengaduan/read-one.php';
      } else {
        require __DIR__ . '/../src/api/pengaduan/read-all.php';
      }
      break;

    case 'POST':
      require __DIR__ . '/../src/api/pengaduan/create.php';
      break;

    case 'PATCH':
      require __DIR__ . '/../src/api/pengaduan/update.php';
      break;

    default:
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan']);
      break;
  }
} else {
  http_response_code(404);
  echo json_encode(['error' => 'Endpoint tidak ditemukan']);
}

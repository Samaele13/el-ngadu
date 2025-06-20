<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

header('Content-Type: application/json');

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_uri) {
  case '/api/pengaduan':
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
      case 'DELETE':
        require __DIR__ . '/../src/api/pengaduan/delete.php';
        break;
      default:
        http_response_code(405);
        echo json_encode(['error' => 'Metode tidak diizinkan untuk endpoint ini']);
        break;
    }
    break;

  case '/api/pengaduan/mine':
    if ($request_method === 'GET') {
      require __DIR__ . '/../src/api/pengaduan/read-mine.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan GET']);
    }
    break;

  case '/api/masyarakat':
    if ($request_method === 'GET') {
      require __DIR__ . '/../src/api/masyarakat/read-all.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan GET']);
    }
    break;

  case '/api/masyarakat/register':
    if ($request_method === 'POST') {
      require __DIR__ . '/../src/api/masyarakat/register.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan POST']);
    }
    break;

  case '/api/auth/login':
    if ($request_method === 'POST') {
      require __DIR__ . '/../src/api/auth/login.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan POST']);
    }
    break;

  case '/api/auth/profile':
    if ($request_method === 'GET') {
      require __DIR__ . '/../src/api/auth/profile.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan GET']);
    }
    break;

  case '/api/auth/logout':
    if ($request_method === 'POST') {
      require __DIR__ . '/../src/api/auth/logout.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan POST']);
    }
    break;

  case '/api/petugas/login':
    if ($request_method === 'POST') {
      require __DIR__ . '/../src/api/petugas/login.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan POST']);
    }
    break;

  case '/api/petugas':
    switch ($request_method) {
      case 'GET':
        require __DIR__ . '/../src/api/petugas/read-all.php';
        break;
      case 'POST':
        require __DIR__ . '/../src/api/petugas/create.php';
        break;
      case 'PATCH':
        require __DIR__ . '/../src/api/petugas/update.php';
        break;
      case 'DELETE':
        require __DIR__ . '/../src/api/petugas/delete.php';
        break;
      default:
        http_response_code(405);
        echo json_encode(['error' => 'Metode tidak diizinkan untuk endpoint ini']);
        break;
    }
    break;

  case '/api/tanggapan':
    if ($request_method === 'POST') {
      require __DIR__ . '/../src/api/tanggapan/create.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan POST']);
    }
    break;

  case '/api/laporan/generate':
    if ($request_method === 'GET') {
      require __DIR__ . '/../src/api/laporan/generate.php';
    } else {
      http_response_code(405);
      echo json_encode(['error' => 'Metode tidak diizinkan, gunakan GET']);
    }
    break;

  default:
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint tidak ditemukan']);
    break;
}

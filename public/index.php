<?php

header('Content-Type: application/json');

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

// Routing
if ($request_uri === '/api/pengaduan') {

  if ($request_method === 'GET') {
    // Check if 'id' is present in the query parameters
    if (isset($_GET['id'])) {
      // if 'id' is present, require the file to read a single record
      require __DIR__ . '/../src/api/pengaduan/read-one.php';
    } else {
      // if 'id' is not present, require the file to read all records
      require __DIR__ . '/../src/api/pengaduan/read-all.php';
    }

  } elseif ($request_method === 'POST') {
    // Logika untuk membuat data baru akan ada di sini nanti
    // require __DIR__ . '/../src/api/pengaduan/create.php';
  }
}
// Anda bisa menambahkan 'else if' di sini untuk rute lain seperti /api/users
// else if ($request_uri === '/api/users') { ... }

else {
  http_response_code(404);
  echo json_encode(['error' => 'Endpoint tidak ditemukan']);
}

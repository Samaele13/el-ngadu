<?php

require_once __DIR__ . '/../src/components/Auth.php';
Auth::startSession();

header("Access-Control-Allow-Origin: http://el-ngadu.test:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
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
                // Cek apakah ada parameter 'q' untuk search
                if (isset($_GET['q'])) {
                    require __DIR__ . '/../src/api/pengaduan/search.php';
                } elseif (isset($_GET['id'])) {
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

    case '/api/notifications/read':
        if ($request_method === 'GET') {
            require __DIR__ . '/../src/api/notifications/read.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan, gunakan GET']);
        }
        break;

    case '/api/notifications/mark-as-read':
        if ($request_method === 'POST') {
            require __DIR__ . '/../src/api/notifications/mark-as-read.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan, gunakan POST']);
        }
        break;

    case '/api/notifications/mark-all-as-read':
        if ($request_method === 'POST') {
            require __DIR__ . '/../src/api/notifications/mark-all-as-read.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan.']);
        }
        break;


    case '/api/stats':
        if ($request_method === 'GET') {
            require __DIR__ . '/../src/api/stats/read.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan, gunakan GET']);
        }
        break;

    case '/api/stats/admin':
        if ($request_method === 'GET') {
            require __DIR__ . '/../src/api/stats/admin.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan.']);
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

    case '/api/pengaduan/stats-mine':
        if ($request_method === 'GET') {
            require __DIR__ . '/../src/api/pengaduan/stats-mine.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan.']);
        }
        break;

    case '/api/masyarakat':
        switch ($request_method) {
            case 'GET':
                require __DIR__ . '/../src/api/masyarakat/read-all.php';
                break;
            case 'DELETE':
                require __DIR__ . '/../src/api/masyarakat/delete.php';
                break;
            // --- TAMBAHKAN CASE BARU UNTUK PATCH ---
            case 'PATCH':
                require __DIR__ . '/../src/api/masyarakat/update.php';
                break;
            default:
                http_response_code(405);
                echo json_encode(['error' => 'Metode tidak diizinkan untuk endpoint ini']);
                break;
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

    case '/api/auth/logout':
        if ($request_method === 'POST') {
            require __DIR__ . '/../src/api/auth/logout.php';
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

    case '/api/auth/update-profile':
        if ($request_method === 'PATCH') {
            require __DIR__ . '/../src/api/auth/update-profile.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan.']);
        }
        break;

    case '/api/auth/change-password':
        if ($request_method === 'POST') {
            require __DIR__ . '/../src/api/auth/change-password.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan.']);
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

    case '/api/petugas/search':
        if ($request_method === 'GET') {
            require __DIR__ . '/../src/api/petugas/search.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan.']);
        }
        break;

    case '/api/masyarakat/search':
        if ($request_method === 'GET') {
            require __DIR__ . '/../src/api/masyarakat/search.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Metode tidak diizinkan.']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint tidak ditemukan']);
        break;
}

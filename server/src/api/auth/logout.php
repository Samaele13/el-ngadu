<?php

require_once __DIR__ . '/../../components/Auth.php';

Auth::logout();

http_response_code(200);
echo json_encode(['message' => 'Logout berhasil.']);

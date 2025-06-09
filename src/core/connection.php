<?php

$config = require __DIR__ . '/../config/db.php';

$dsn = "mysql:host={$config['host']};dbname={$config['name']};charset={$config['charset']}";

$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  $pdo = new PDO($dsn, $config['user'], $config['pass'], $options);
} catch (PDOException $e) {
  die("Koneksi database gagal: " . $e->getMessage());
}

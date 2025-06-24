<?php
require_once __DIR__ . '/../../components/Auth.php';
require_once __DIR__ . '/../../components/Database.php';

Auth::startSession();

if (!Auth::isLoggedIn() || $_SESSION['level'] !== 'admin') {
  http_response_code(403);
  echo json_encode(['error' => 'Akses ditolak.']);
  exit();
}

$pdo = Database::connect();

$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) && is_numeric($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

try {
  $totalQuery = $pdo->query("SELECT COUNT(*) FROM masyarakat");
  $total_records = $totalQuery->fetchColumn();
  $total_pages = ceil($total_records / $limit);

  $sql = "SELECT nik, nama, username, telp, created_at FROM masyarakat ORDER BY nama ASC LIMIT :limit OFFSET :offset";

  $statement = $pdo->prepare($sql);
  $statement->bindParam(':limit', $limit, PDO::PARAM_INT);
  $statement->bindParam(':offset', $offset, PDO::PARAM_INT);
  $statement->execute();

  $masyarakat = $statement->fetchAll();

  http_response_code(200);
  echo json_encode([
    'pagination' => [
      'current_page' => $page,
      'total_pages' => (int)$total_pages,
      'total_records' => (int)$total_records,
      'limit' => $limit
    ],
    'data' => $masyarakat
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Gagal mengambil data masyarakat: ' . $e->getMessage()]);
}

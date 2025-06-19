<?php

class Auth
{
  public static function startSession()
  {
    if (session_status() === PHP_SESSION_NONE) {
      session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => $_SERVER['SERVER_NAME'],
        'secure' => isset($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Lax'
      ]);
      session_start();
    }
  }

  public static function login($user, $user_type)
  {
    self::startSession();
    session_regenerate_id(true);

    $_SESSION['is_logged_in'] = true;
    $_SESSION['user_type'] = $user_type;

    if ($user_type === 'masyarakat') {
      $_SESSION['user_id'] = $user['nik'];
      $_SESSION['nik'] = $user['nik']; // <-- PERUBAHAN ADA DI SINI
      $_SESSION['username'] = $user['username'];
      $_SESSION['nama'] = $user['nama'];
    } elseif ($user_type === 'petugas') {
      $_SESSION['user_id'] = $user['id_petugas'];
      $_SESSION['username'] = $user['username'];
      $_SESSION['nama_petugas'] = $user['nama_petugas'];
      $_SESSION['level'] = $user['level'];
    }
  }

  public static function logout()
  {
    self::startSession();
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
      $params = session_get_cookie_params();
      setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
      );
    }
    session_destroy();
  }

  public static function isLoggedIn()
  {
    self::startSession();
    return isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true;
  }

  public static function getUserId()
  {
    self::startSession();
    return $_SESSION['user_id'] ?? null;
  }

  public static function getUserType()
  {
    self::startSession();
    return $_SESSION['user_type'] ?? null;
  }
}

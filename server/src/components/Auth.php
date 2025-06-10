<?php
class Auth
{
  public static function startSession()
  {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
    }
  }

  public static function login($user, $user_type)
  {
    self::startSession();
    // Hapus data sesi lama untuk memastikan sesi bersih
    session_regenerate_id(true);

    $_SESSION['is_logged_in'] = true;
    $_SESSION['user_type'] = $user_type;

    if ($user_type === 'masyarakat') {
      $_SESSION['user_id'] = $user['nik'];
      $_SESSION['username'] = $user['username'];
    } elseif ($user_type === 'petugas') {
      $_SESSION['user_id'] = $user['id_petugas'];
      $_SESSION['username'] = $user['username'];
      $_SESSION['level'] = $user['level'];
    }
  }

  public static function logout()
  {
    self::startSession();
    $_SESSION = [];
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

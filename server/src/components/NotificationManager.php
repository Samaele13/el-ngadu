<?php

class NotificationManager
{
  /**
   * Creates a new notification.
   * @param PDO $db The database connection object.
   * @param string $user_identifier The NIK or ID of the user to notify.
   * @param string $user_type 'masyarakat' or 'petugas'.
   * @param string $message The notification message.
   * @param string|null $link_url An optional URL for the notification.
   * @return bool True on success, false on failure.
   */
  public static function create(PDO $db, string $user_identifier, string $user_type, string $message, ?string $link_url = null): bool
  {
    $sql = "INSERT INTO notifications (user_identifier, user_type, message, link_url) VALUES (?, ?, ?, ?)";
    try {
      $stmt = $db->prepare($sql);
      $stmt->execute([$user_identifier, $user_type, $message, $link_url]);
      return true;
    } catch (PDOException $e) {
      return false;
    }
  }
}

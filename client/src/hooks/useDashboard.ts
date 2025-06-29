import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import { markAllNotificationsAsReadService } from "@/services/notificationService";
import { calculateProfileProgress } from "@/lib/utils";
import type { Notification, NavItem } from "@/types";
import {
  Home,
  FileText,
  History,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  User as UserIcon,
} from "lucide-react";

// Definisikan item navigasi di sini, dekat dengan logikanya
const navItemsMasyarakat: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/dashboard/buat-pengaduan", label: "Buat Pengaduan", icon: FileText },
  { to: "/dashboard/riwayat", label: "Riwayat Pengaduan", icon: History },
  { to: "/dashboard/profil", label: "Profil Saya", icon: UserIcon },
];
const navItemsPetugas: NavItem[] = [
  {
    to: "/dashboard/kelola-pengaduan",
    label: "Semua Pengaduan",
    icon: FileText,
  },
  { to: "/dashboard/profil", label: "Profil Saya", icon: UserIcon },
];
const navItemsAdmin: NavItem[] = [
  {
    to: "/dashboard/kelola-pengaduan",
    label: "Kelola Pengaduan",
    icon: FileText,
  },
  {
    to: "/dashboard/kelola-petugas",
    label: "Kelola Petugas",
    icon: ShieldCheck,
  },
  {
    to: "/dashboard/kelola-masyarakat",
    label: "Kelola Masyarakat",
    icon: Users,
  },
  { to: "/dashboard/laporan", label: "Laporan", icon: FileSpreadsheet },
  { to: "/dashboard/profil", label: "Profil Saya", icon: UserIcon },
];

export function useDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const profileProgress = useMemo(() => calculateProfileProgress(user), [user]);

  // Logika untuk menentukan item navigasi
  useEffect(() => {
    if (user?.userType === "petugas") {
      setNavItems(user.level === "admin" ? navItemsAdmin : navItemsPetugas);
    } else if (user?.userType === "masyarakat") {
      setNavItems(navItemsMasyarakat);
    }
  }, [user]);

  // Logika untuk mengambil notifikasi
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.get("/notifications/read");
      if (response.data && Array.isArray(response.data)) {
        const fetchedNotifications: Notification[] = response.data;
        setNotifications(fetchedNotifications);
        setUnreadCount(fetchedNotifications.filter((n) => !n.is_read).length);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout();
        navigate("/login");
      }
    }
  }, [user, logout, navigate]);

  // Efek untuk polling notifikasi
  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000); // 30 detik
    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, is_read: true } : notif
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    api
      .post("/notifications/mark-as-read", { notification_id: id })
      .catch((err) => console.error(err));
  };

  const handleMarkAllAsRead = async () => {
    const originalNotifications = [...notifications];
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
    try {
      await markAllNotificationsAsReadService();
      toast.success("Semua notifikasi telah ditandai dibaca.");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal menandai notifikasi."
      );
      // Rollback jika gagal
      setNotifications(originalNotifications);
      setUnreadCount(originalNotifications.filter((n) => !n.is_read).length);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Gagal logout dari server:", error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return {
    user,
    navItems,
    notifications,
    unreadCount,
    profileProgress,
    markNotificationAsRead,
    handleMarkAllAsRead,
    handleLogout,
  };
}

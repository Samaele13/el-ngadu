import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

import { Home, FileText, History, Users, ShieldCheck, FileSpreadsheet } from "lucide-react";
import type { Notification, NavItem } from "@/types";

const navItemsMasyarakat: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/dashboard/buat-pengaduan", label: "Buat Pengaduan", icon: FileText },
  { to: "/dashboard/riwayat", label: "Riwayat Pengaduan", icon: History },
];

const navItemsPetugas: NavItem[] = [
  { to: "/dashboard", label: "Semua Pengaduan", icon: FileText },
];

const navItemsAdmin: NavItem[] = [
  { to: "/dashboard/kelola-pengaduan", label: "Kelola Pengaduan", icon: FileText },
  { to: "/dashboard/kelola-petugas", label: "Kelola Petugas", icon: ShieldCheck },
  { to: "/dashboard/kelola-masyarakat", label: "Kelola Masyarakat", icon: Users },
  { to: "/dashboard/laporan", label: "Laporan", icon: FileSpreadsheet },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileProgress] = useState(75);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    if (user?.userType === 'petugas') {
      if (user.level === 'admin') {
        setNavItems(navItemsAdmin);
      } else {
        setNavItems(navItemsPetugas);
      }
    } else {
      setNavItems(navItemsMasyarakat);
    }
  }, [user]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // CORRECTED: URL no longer has .php
        const response = await api.get("/notifications/read");
        if (response.data && Array.isArray(response.data.notifications)) {
          const fetchedNotifications: Notification[] =
            response.data.notifications;
          setNotifications(fetchedNotifications);
          setUnreadCount(
            fetchedNotifications.filter((n: Notification) => !n.is_read).length
          );
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response: { status: number } };
          if (axiosError.response?.status === 401) {
            logout();
            navigate("/login");
          }
        }
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, [logout, navigate]);

  const markNotificationAsRead = async (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, is_read: 1 } : notif))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      // CORRECTED: URL no longer has .php
      await api.post("/notifications/mark-as-read", { notification_id: id });
    } catch (error) {
      console.error("Failed to mark notification as read on server:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Gagal logout dari server:", error);
    } finally {
      logout();
      navigate("/login");
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newIsDarkMode = !prev;
      if (newIsDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newIsDarkMode;
    });
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashboardSidebar
          navItems={navItems}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashboardHeader
            user={user}
            navItems={navItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            notifications={notifications}
            unreadCount={unreadCount}
            markNotificationAsRead={markNotificationAsRead}
            profileProgress={profileProgress}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            handleLogout={handleLogout}
          />
          <main className="flex-1 p-4 sm:px-6 md:gap-8 mt-2">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
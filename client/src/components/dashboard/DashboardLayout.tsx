// CLIENT/src/components/dashboard/DashboardLayout.tsx

import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

import { Home, FileText, History } from "lucide-react";
import type { Notification } from "@/types";

const navItemsMasyarakat = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/dashboard/buat-pengaduan", label: "Buat Pengaduan", icon: FileText },
  { to: "/dashboard/riwayat", label: "Riwayat Pengaduan", icon: History },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileProgress] = useState(75);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // CORRECTED: URL no longer has .php
        const response = await api.get("/notifications/read");
        if (response.data && Array.isArray(response.data.notifications)) {
          const fetchedNotifications: Notification[] = response.data.notifications;
          setNotifications(fetchedNotifications);
          setUnreadCount(fetchedNotifications.filter((n: Notification) => !n.is_read).length);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        if ((error as any).response?.status === 401) {
            logout();
            navigate('/login');
        }
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, [logout, navigate]);

  const markNotificationAsRead = async (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, is_read: 1 } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));

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
    setIsDarkMode(prev => {
      const newIsDarkMode = !prev;
      if (newIsDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newIsDarkMode;
    });
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashboardSidebar
          navItems={navItemsMasyarakat}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashboardHeader
            user={user}
            navItems={navItemsMasyarakat}
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

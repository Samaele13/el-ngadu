import { Outlet } from "react-router-dom";
import { useDashboard } from "@/hooks/useDashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "./DashboardHeader"; // Asumsi file ini ada di folder yang sama
import DashboardSidebar from "./DashboardSidebar"; // Asumsi file ini ada di folder yang sama

export default function DashboardLayout() {
  const {
    user,
    navItems,
    notifications,
    unreadCount,
    profileProgress,
    markNotificationAsRead,
    handleMarkAllAsRead,
    handleLogout,
  } = useDashboard();

  // Jika user belum termuat (misal saat refresh), tampilkan loading atau null
  // Ini mencegah error "user is null" saat pertama kali render
  if (!user) {
    return null; // atau tampilkan komponen loading satu halaman penuh
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashboardSidebar navItems={navItems} onLogout={handleLogout} />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashboardHeader
            user={user}
            navItems={navItems}
            notifications={notifications}
            unreadCount={unreadCount}
            markNotificationAsRead={markNotificationAsRead}
            handleMarkAllAsRead={handleMarkAllAsRead}
            profileProgress={profileProgress}
            handleLogout={handleLogout}
          />
          <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

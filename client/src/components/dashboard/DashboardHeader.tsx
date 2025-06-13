
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Filter, PanelLeft, Search } from "lucide-react";

import MobileSheet from "./MobileSheet";
import Notifications from "./Notifications";
import UserNav from "./UserNav";

// CORRECTED: This line must use 'import type'
import type { User, Notification, NavItem } from "@/types";

interface DashboardHeaderProps {
  user: User | null;
  navItems: NavItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  notifications: Notification[];
  unreadCount: number;
  markNotificationAsRead: (id: number) => void;
  profileProgress: number;
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleLogout: () => void;
}

// ... the rest of your component code
export default function DashboardHeader({
  user,
  navItems,
  searchQuery,
  setSearchQuery,
  handleSearch,
  notifications,
  unreadCount,
  markNotificationAsRead,
  profileProgress,
  isDarkMode,
  toggleTheme,
  handleLogout,
}: DashboardHeaderProps) {
//...
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <MobileSheet
          navItems={navItems}
          user={user}
          profileProgress={profileProgress}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </Sheet>

      <div className="relative ml-auto flex-1 md:grow-0">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari pengaduan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-background pl-8 pr-12 sm:w-[200px] md:w-[250px] lg:w-[336px]"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1 h-6 w-6"
            onClick={() => navigate("/dashboard/filter")}
          >
            <Filter className="h-3 w-3" />
          </Button>
        </form>
      </div>

      <Notifications
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={markNotificationAsRead}
      />

      <UserNav user={user} profileProgress={profileProgress} onLogout={handleLogout} />
    </header>
  );
}
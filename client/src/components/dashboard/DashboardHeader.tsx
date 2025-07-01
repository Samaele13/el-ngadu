import { useState, useEffect, type FormEvent } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PanelLeft, Search } from "lucide-react";
import MobileSheet from "./MobileSheet";
import Notifications from "./Notifications";
import UserNav from "./UserNav";
import type { User, Notification, NavItem } from "@/types";

interface DashboardHeaderProps {
  user: User | null;
  navItems: NavItem[];
  notifications: Notification[];
  unreadCount: number;
  markNotificationAsRead: (id: number) => void;
  handleMarkAllAsRead: () => void;
  profileProgress: number;
  handleLogout: () => void;
}

export default function DashboardHeader({
  user,
  navItems,
  notifications,
  unreadCount,
  markNotificationAsRead,
  handleMarkAllAsRead,
  profileProgress,
  handleLogout,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Cari...");
  const [searchContext, setSearchContext] = useState("pengaduan");

  useEffect(() => {
    const path = location.pathname;
    const currentQuery = searchParams.get("q");
    setSearchQuery(currentQuery || "");

    // Logika baru untuk menentukan konteks dan placeholder
    if (path.includes("/search")) {
      const type = searchParams.get("type");
      switch (type) {
        case "petugas":
          setSearchPlaceholder("Cari nama atau username petugas...");
          setSearchContext("petugas");
          break;
        case "masyarakat":
          setSearchPlaceholder("Cari nama atau NIK masyarakat...");
          setSearchContext("masyarakat");
          break;
        default:
          setSearchPlaceholder("Cari judul pengaduan...");
          setSearchContext("pengaduan");
          break;
      }
    } else if (path.includes("/kelola-petugas")) {
      setSearchPlaceholder("Cari nama atau username petugas...");
      setSearchContext("petugas");
    } else if (path.includes("/kelola-masyarakat")) {
      setSearchPlaceholder("Cari nama atau NIK masyarakat...");
      setSearchContext("masyarakat");
    } else {
      setSearchPlaceholder("Cari judul pengaduan...");
      setSearchContext("pengaduan");
    }
  }, [location.pathname, searchParams]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/dashboard/search?q=${encodeURIComponent(
          searchQuery
        )}&type=${searchContext}`
      );
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
          onLogout={handleLogout}
        />
      </Sheet>

      <div className="relative ml-auto flex-1 md:grow-0">
        <form onSubmit={handleSearch}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[336px]"
          />
        </form>
      </div>

      <Notifications
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={markNotificationAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <UserNav
        user={user}
        profileProgress={profileProgress}
        onLogout={handleLogout}
      />
    </header>
  );
}

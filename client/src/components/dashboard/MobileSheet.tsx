import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme"; // Impor hook tema yang baru
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SheetContent } from "@/components/ui/sheet";
import { HelpCircle, LogOut, Moon, Sun } from "lucide-react";
import type { User, NavItem } from "@/types";

// Perbarui interface props, hapus isDarkMode dan onToggleTheme
interface MobileSheetProps {
  navItems: NavItem[];
  user: User | null;
  profileProgress: number;
  onLogout: () => void;
}

export default function MobileSheet({
  navItems,
  user,
  profileProgress,
  onLogout,
}: MobileSheetProps) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme(); // Gunakan hook dari lokasi baru

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getDisplayName = () => {
    if (!user) return "User";
    return user.userType === "masyarakat" ? user.nama : user.nama_petugas;
  };

  return (
    <SheetContent side="left" className="sm:max-w-xs">
      <nav className="grid gap-3 text-lg font-medium pt-4">
        <Link
          to="/dashboard"
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground"
        >
          <img
            src="/assets/image.png"
            alt="Logo El Ngadu"
            className="h-8 w-8 transition-all group-hover:scale-110"
          />
          <span className="sr-only">El Ngadu</span>
        </Link>

        <div className="mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/8.x/initials/svg?seed=${
                  user?.username || "user"
                }`}
                alt={user?.username}
              />
              <AvatarFallback>
                {user?.username?.substring(0, 2).toUpperCase() || "US"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{getDisplayName()}</p>
              <p className="text-xs text-muted-foreground">
                Profil {profileProgress}% lengkap
              </p>
            </div>
          </div>
          <Progress value={profileProgress} className="h-2" />
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-2.5 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}

        <div className="mt-auto pt-4 space-y-2">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="w-full justify-start gap-4 text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            onClick={() => navigate("/dashboard/bantuan")}
            variant="ghost"
            className="w-full justify-start gap-4 text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-5 w-5" />
            Bantuan
          </Button>
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start gap-4 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </nav>
    </SheetContent>
  );
}

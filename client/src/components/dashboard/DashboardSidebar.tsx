import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme"; // Perbarui path impor
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, LogOut, Moon, Sun } from "lucide-react";
import type { NavItem } from "@/types";

interface DashboardSidebarProps {
  navItems: NavItem[];
  onLogout: () => void;
}

export default function DashboardSidebar({ navItems, onLogout }: DashboardSidebarProps) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme(); // Gunakan hook dari lokasi baru

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
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

        {navItems.map((item) => (
          <Tooltip key={item.to}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.to}
                end={item.to === "/dashboard"}
                className={({ isActive }) =>
                  `flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => navigate("/dashboard/bantuan")}
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Bantuan</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Bantuan</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

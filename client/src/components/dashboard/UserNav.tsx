// src/components/dashboard/UserNav.tsx

import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, Settings, HelpCircle, LogOut } from "lucide-react";
import type { User } from "@/types"; // CORRECTED: type-only import

interface UserNavProps {
  user: User | null;
  profileProgress: number;
  onLogout: () => void;
}

// ... rest of the component code is the same
export default function UserNav({ user, profileProgress, onLogout }: UserNavProps) {
  const navigate = useNavigate();

  const getDisplayName = () => {
    if (!user) return "User";
    return user.userType === 'masyarakat' ? user.nama : user.nama_petugas;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.username || "user"}`}
              alt={user?.username}
            />
            <AvatarFallback>
              {user?.username?.substring(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Buka menu pengguna</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="pb-1">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {getDisplayName()}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              @{user?.username}{user?.userType === 'petugas' && ` (${user.level})`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs">Profil</span>
            <span className="text-xs text-muted-foreground">{profileProgress}%</span>
          </div>
          <Progress value={profileProgress} className="h-2" />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => navigate("/dashboard/profil")}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/dashboard/pengaturan")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Pengaturan</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/dashboard/bantuan")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Bantuan</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={onLogout}
          className="text-muted-foreground hover:text-destructive hover:bg-muted"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
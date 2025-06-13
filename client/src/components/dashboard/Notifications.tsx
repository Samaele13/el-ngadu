
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import type { Notification } from "@/types"; // CORRECTED: type-only import

interface NotificationsProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: number) => void;
}

// ... rest of the component code is the same
export default function Notifications({ notifications, unreadCount, onMarkAsRead }: NotificationsProps) {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Notifikasi</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            className="flex items-start gap-2 p-3"
                            onSelect={() => onMarkAsRead(notification.id)}
                        >
                            <div className="flex-1">
                                <p className="text-sm font-medium">{notification.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {notification.type === 'success' ? 'Berhasil' : 'Info'}
                                </p>
                            </div>
                            {!notification.read && (
                                <div className="h-2 w-2 bg-primary rounded-full mt-1" />
                            )}
                        </DropdownMenuItem>
                    ))
                ) : (
                    <DropdownMenuItem disabled>
                        <p className="text-sm text-muted-foreground">Tidak ada notifikasi</p>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate("/dashboard/notifikasi")}>
                    Lihat semua notifikasi
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
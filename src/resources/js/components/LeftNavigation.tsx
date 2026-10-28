import {
  Newspaper,
  CheckSquare,
  Bell,
  Sparkles,
  Users,
  FileCheck,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";

/* ================= NAV ITEM ================= */

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  href: string;
}

export function NavItem({
  icon,
  label,
  active,
  badge,
  href,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
        active ? "text-white" : "text-gray-700 hover:bg-gray-50"
      }`}
      style={active ? { background: "#e2001a" } : {}}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>

      {badge !== undefined && badge > 0 && (
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
            active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

/* ================= NAVIGATION ================= */

export function LeftNavigation() {
  const { props , url } = usePage<{
    auth: { user: { id: number; roles: string[] } };
    unreadNotificationsCount: number;
    pendingAccessRequestsCount: number;
    pendingPostsCount: number;
  }>();

  const {
    auth,
    unreadNotificationsCount,
    pendingAccessRequestsCount,
    pendingPostsCount,
  } = props;

  const {
    unreadCount,
    setUnreadCount,
    pendingAccess,
    setPendingAccess,
    pendingPosts,
    setPendingPosts,
  } = useApp();

  const roles = auth?.user?.roles || [];

  const isAdmin = roles.includes("Administrateur");
  const isContentManager = roles.includes("Content_manager");

  /* ================= REALTIME ECHO ================= */

  useEffect(() => {
    if (!window.Echo) return;

    const userId = auth?.user?.id;

    window.Echo.private(`App.Models.User.${userId}`)
      /* notification générale */
      .notification((notification: any) => {
        setUnreadCount((prev: number) => prev + 1);
      });

    /* demandes accès admin */
    window.Echo.channel("access-requests")
      .listen(".AccessRequestCreated", () => {
        setPendingAccess((prev: number) => prev + 1);
      });

    /* validation posts content manager */
    window.Echo.channel("posts-validation")
      .listen(".PostPending", () => {
        setPendingPosts((prev: number) => prev + 1);
      });

    return () => {
      window.Echo.leave(`App.Models.User.${userId}`);
      window.Echo.leave("access-requests");
      window.Echo.leave("posts-validation");
    };
  }, []);

  /* ================= UI ================= */

  return (
    <div className="w-64 space-y-4">
      <Card>
        <CardContent className="p-2">
          <nav className="space-y-1">

            <NavItem
              icon={<Newspaper className="w-5 h-5" />}
              label="Actualités"
              href="/Home"
              active={url === "/Home"}
            />

            <NavItem
              icon={<CheckSquare className="w-5 h-5" />}
              label="Tâches"
              href="/tasks"
              active={url === "/tasks"}
            />

            {/* CONTENT MANAGER */}
            {isContentManager && (
              <NavItem
                icon={<FileCheck className="w-5 h-5" />}
                label="Validation"
                href="/content"
                badge={
                  pendingPosts > 0
                    ? pendingPosts
                    : pendingPostsCount
                }
                active={url === "/content"}
              />
            )}

            {/* NOTIFICATIONS */}
            <NavItem
              icon={<Bell className="w-5 h-5" />}
              label="Notifications"
              href="/notifications"
              badge={
                unreadCount > 0
                  ? unreadCount
                  : unreadNotificationsCount
              }
              active={url === "/notifications"}
            />

            {/* ADMIN */}
            {isAdmin && (
              <NavItem
                icon={<Users className="w-5 h-5" />}
                label="Personnels"
                href="/personnels"
                badge={
                  pendingAccess > 0
                    ? pendingAccess
                    : pendingAccessRequestsCount
                }
                active={url === "/personnels"}
              />
            )}

            <NavItem
              icon={<Sparkles className="w-5 h-5" />}
              label="Découvrir"
              href="/discover"
              active={url === "/discover"}
            />

            <NavItem
              icon={<HelpCircle className="w-5 h-5" />}
              label="Aide"
              href="/aide"
              active={url === "/aide"}
            />

          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
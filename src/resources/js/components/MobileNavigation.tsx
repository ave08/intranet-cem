import {
  Newspaper,
  CheckSquare,
  Bell,
  HelpCircle,
  Sparkles,
  X,
  Users,
  FileCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link, usePage } from "@inertiajs/react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  href: string;
}

function NavItem({ icon, label, active, badge, onClick, href }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
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

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const { props } = usePage() as any;
  const { auth, url = "" } = props;

  const user = props?.auth?.user;
  const tasks = props?.tasks || [];

  const roles = auth?.user?.roles || [];

  // Vérification
  const isAdmin = roles.includes("Administrateur");
  const isContentManager = roles.includes("Content_manager");

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto">
        <div className="p-4 space-y-4">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* NAVIGATION */}
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">

                <NavItem
                  icon={<Newspaper className="w-5 h-5" />}
                  label="Actualités"
                  href="/Home"
                  active={url === "/Home"}
                  onClick={onClose}
                />

                <NavItem
                  icon={<CheckSquare className="w-5 h-5" />}
                  label="Tâches"
                  href="/tasks"
                  active={url.startsWith("/tasks")}
                  badge={tasks.length}
                  onClick={onClose}
                />

                <NavItem
                  icon={<Bell className="w-5 h-5" />}
                  label="Notifications"
                  href="/notifications"
                  active={url.startsWith("/notifications")}
                  onClick={onClose}
                />

                {isContentManager && (
                  <NavItem
                    icon={<FileCheck className="w-5 h-5" />}
                    label="Validation"
                    href="/content"
                    active={url.startsWith("/content")}
                    onClick={onClose}
                  />
                )}

                {/* ADMIN ONLY */}
                {isAdmin && (
                  <NavItem
                    icon={<Users className="w-5 h-5" />}
                    label="Personnels"
                    href="/personnels"
                    active={url.startsWith("/personnels")}
                    onClick={onClose}
                  />
                )}

                <NavItem
                  icon={<Sparkles className="w-5 h-5" />}
                  label="Découvrir"
                  href="/discover"
                  active={url.startsWith("/discover")}
                  onClick={onClose}
                />

                <NavItem 
                  icon={<HelpCircle className="w-5 h-5" />} 
                  label="Aide" 
                  href="/aide"
                  active={url.startsWith("/aide")}
                  onClick={onClose}
                />

              </nav>
            </CardContent>
          </Card>

          {/* TASKS (remplace événements) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-red-600" />
                Tâches récentes
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {tasks.length === 0 && (
                <p className="text-sm text-gray-500">
                  Aucune tâche disponible
                </p>
              )}

              {tasks.slice(0, 5).map((task: any) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border bg-gray-50"
                >
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500">
                    Statut : {task.status}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
}
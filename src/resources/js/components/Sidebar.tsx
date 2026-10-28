import { Home, Users, Briefcase, Calendar, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-green-50 text-green-700"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 space-y-4">
      {/* Navigation */}
      <Card>
        <CardContent className="p-2">
          <nav className="space-y-1">
            <NavItem icon={<Home className="w-5 h-5" />} label="Accueil" active />
            <NavItem icon={<Users className="w-5 h-5" />} label="Mon réseau" />
            <NavItem icon={<Briefcase className="w-5 h-5" />} label="Opportunités" />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Événements" />
          </nav>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Tendances
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">#InnovationDigitale</p>
            <p className="text-xs text-gray-500">124 publications</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">#SuccèsClient</p>
            <p className="text-xs text-gray-500">89 publications</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">#ÉquipeCEM</p>
            <p className="text-xs text-gray-500">156 publications</p>
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-600" />
            Top contributeurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Jean Rakoto", role: "Directeur Marketing", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
            { name: "Marie Razafi", role: "Chef de Projet", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
            { name: "Paul Andria", role: "Analyste Senior", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
          ].map((person, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src={person.avatar} />
                <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                <p className="text-xs text-gray-500 truncate">{person.role}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}

import { useState } from "react";
import { usePage , useForm , router } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";

import {
  Camera,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle2,
  History,
  Monitor,
  Smartphone,
  LogIn,
  Settings,
  User,
  Key,
  Clock,
  MapPin,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { Alert, AlertDescription } from "../components/ui/alert";

/* ================= TYPES ================= */

interface ActivityLog {
  id: number;
  type: "login" | "password" | "profile" | "settings" | "security";
  action: string;
  description: string;
  created_at: string;
  device?: string;
  location?: string;
  ip_address?: string;
}

type User = {
  id: number;
  name: string;
  prenom: string;
  email: string;
  phone?: string;
  photo_profile?: string;
  created_at: string;

  service?: {
    libelle: string;
  };

  roles?: string[];

  settings?: {
    email_notifications: boolean;
    push_notifications: boolean;
    mention_notifications: boolean;
    comment_notifications: boolean;
    like_notifications: boolean;

    profile_visibility: boolean;
    show_email: boolean;
    show_phone: boolean;
  };
};

type PageProps = {
  activityLogs: ActivityLog[];
  auth: {
    user: User;
  };
};

/* ================= PAGE ================= */

export function SettingsPage() {
  const { props } = usePage<PageProps>();
  const activityLogs = props.activityLogs || [];


  const user = props.auth.user;
  const profileAvatar = user.photo_profile
    ? `/storage/${user.photo_profile}`
    : "";

  const { flash } = usePage().props as any;
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  /* PASSWORD */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  /* SETTINGS */
  const { data, setData, put, post, processing ,reset } = useForm({
    email_notifications: user.settings?.email_notifications ?? true,
    push_notifications: user.settings?.push_notifications ?? true,
    mention_notifications: user.settings?.mention_notifications ?? true,
    comment_notifications: user.settings?.comment_notifications ?? true,
    like_notifications: user.settings?.like_notifications ?? false,

    profile_visibility: user.settings?.profile_visibility ?? true,
    show_email: user.settings?.show_email ?? false,
    show_phone: user.settings?.show_phone ?? true,
  });
  /* ================= METHODS ================= */

  const saveNotificationSettings = () => {
    put("/settings/notifications", {
      preserveScroll: true,
    });
  };

  const savePrivacySettings = () => {
    put("/settings/privacy", {
      preserveScroll: true,
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // validation simple
    if (!file.type.startsWith("image/")) return;

    setSelectedImage(file);
  };

  const handleSaveAvatar = () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("photo_profile", selectedImage);

    router.post("/profile/avatar", formData, {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        setIsUploadDialogOpen(false);
        setSelectedImage(null);
        router.reload({
        only: ["auth"],
      });
      },
    });
  };

  const handlePasswordChange = () => {
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Tous les champs sont requis");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Minimum 8 caractères");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    router.post("/profile/password", {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
      onError: (errors) => {
        setPasswordError(errors.password || "Erreur lors du changement");
      },
    });
  };

  /* ================= HELPERS ================= */

  const getActivityIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "login": return <LogIn className="w-5 h-5 text-green-600" />;
      case "password": return <Key className="w-5 h-5 text-blue-600" />;
      case "profile": return <User className="w-5 h-5 text-purple-600" />;
      case "settings": return <Settings className="w-5 h-5 text-orange-600" />;
      case "security": return <Shield className="w-5 h-5 text-red-600" />;
    }
  };

  const getActivityBadge = (type: ActivityLog["type"]) => {
    switch (type) {
      case "login": return <Badge className="bg-green-100 text-green-700">Connexion</Badge>;
      case "password": return <Badge className="bg-blue-100 text-blue-700">Sécurité</Badge>;
      case "profile": return <Badge className="bg-purple-100 text-purple-700">Profil</Badge>;
      case "settings": return <Badge className="bg-orange-100 text-orange-700">Paramètres</Badge>;
      case "security": return <Badge className="bg-red-100 text-red-700">Alerte</Badge>;
    }
  };

  const getDeviceIcon = (device?: string) => {
    if (!device) return null;
    if (device.toLowerCase().includes("mobile")) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  /* ================= UI ================= */

  return (
    <main className="flex-1 w-full space-y-4">
      {/* Flash messages */}
      {flash?.success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded">
          {flash.success}
        </div>
      )}

      {flash?.error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
          {flash.error}
        </div>
      )}

      {/* HEADER */}
      <Card className="border-none shadow-sm" style={{ borderTop: '4px solid #e2001a' }}>
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
          <CardDescription>Gérez votre compte</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="account">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        {/* ================= ACCOUNT ================= */}
        <TabsContent value="account" className="space-y-4 mt-4">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Photo de profil</CardTitle>
              <CardDescription>Modifiez votre photo de profil visible par tous les employés</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                className="hidden"
                onChange={handleImageSelect}
              />
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                    <AvatarImage src={profileAvatar} />
                    <AvatarFallback className="text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm text-gray-600 mb-2">
                    Cliquez pour changer votre photo de profil
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                    className="w-full sm:w-auto"
                    style={{ borderColor: '#e2001a', color: '#e2001a' }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Changer la photo
                  </Button>
                  {selectedImage && (
                    <div className="mt-3 flex gap-2 items-center">
                      <p className="text-xs text-gray-600">
                        Image sélectionnée : {selectedImage.name}
                      </p>

                      <Button
                        onClick={handleSaveAvatar}
                        size="sm"
                        className="text-white"
                        style={{ background: "#e2001a" }}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PASSWORD */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Modifier le mot de passe
              </CardTitle>
              <CardDescription>Assurez-vous d'utiliser un mot de passe fort et unique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              {passwordError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe actuel"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Entrez votre nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Minimum 8 caractères</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                onClick={handlePasswordChange}
                className="w-full sm:w-auto text-white"
                style={{ background: '#e2001a' }}
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer le mot de passe
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Préférences de notification
              </CardTitle>
              <CardDescription>Choisissez comment vous souhaitez être informé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-900">Canaux de notification</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notifications par email</Label>
                    <p className="text-xs text-gray-500">Recevoir des notifications par email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={data.email_notifications}
                    onCheckedChange={(v) => setData("email_notifications", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Notifications push</Label>
                    <p className="text-xs text-gray-500">Recevoir des notifications dans l'application</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={data.push_notifications}
                    onCheckedChange={(v) => setData("push_notifications", v)}
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium text-sm text-gray-900">Types de notification</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mention-notifications">Mentions</Label>
                    <p className="text-xs text-gray-500">Quand quelqu'un vous mentionne</p>
                  </div>
                  <Switch
                    id="mention-notifications"
                    checked={data.mention_notifications}
                    onCheckedChange={(v) => setData("mention_notifications", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comment-notifications">Commentaires</Label>
                    <p className="text-xs text-gray-500">Quand quelqu'un commente vos publications</p>
                  </div>
                  <Switch
                    id="comment-notifications"
                    checked={data.comment_notifications}
                    onCheckedChange={(v) => setData("comment_notifications", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="like-notifications">J'aime</Label>
                    <p className="text-xs text-gray-500">Quand quelqu'un aime vos publications</p>
                  </div>
                  <Switch
                    id="like-notifications"
                    checked={data.like_notifications}
                    onCheckedChange={(v) => setData("like_notifications", v)}
                  />
                </div>
              </div>

              <Button 
                onClick={saveNotificationSettings}
                className="w-full sm:w-auto text-white"
                style={{ background: '#e2001a' }}>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les préférences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Confidentialité
              </CardTitle>
              <CardDescription>Contrôlez la visibilité de vos informations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-900">Visibilité du profil</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profile-visibility">Profil public</Label>
                    <p className="text-xs text-gray-500">Permettre à tous les employés de voir votre profil</p>
                  </div>
                  <Switch
                    id="profile-visibility"
                    checked={data.profile_visibility}
                    onCheckedChange={(v) => setData("profile_visibility", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-email">Afficher l'email</Label>
                    <p className="text-xs text-gray-500">Rendre votre email visible sur votre profil</p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={data.show_email}
                    onCheckedChange={(v) => setData("show_email", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-phone">Afficher le téléphone</Label>
                    <p className="text-xs text-gray-500">Rendre votre numéro de téléphone visible</p>
                  </div>
                  <Switch
                    id="show-phone"
                    checked={data.show_phone}
                    onCheckedChange={(v) => setData("show_phone", v)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Vos données sont protégées par les normes de sécurité bancaire et ne sont jamais partagées en dehors de l'organisation.
                  </AlertDescription>
                </Alert>
              </div>

              <Button
                onClick={savePrivacySettings}
                className="w-full sm:w-auto text-white" 
                style={{ background: '#e2001a' }}>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les paramètres
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= HISTORY ================= */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5"/>
                Historique des activités
              </CardTitle>
            </CardHeader>

            <CardContent>
              {activityLogs.length === 0 && (
                <p className="text-gray-500">Aucune activité</p>
              )}

              <div className="space-y-3">
                {activityLogs.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4 flex gap-3">

                      {getActivityIcon(activity.type)}

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">{activity.action}</h4>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                          </div>
                          {getActivityBadge(activity.type)}
                        </div>

                        <div className="flex gap-3 text-xs text-gray-400 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3"/> {activity.created_at}
                          </span>

                          {activity.device && (
                            <span className="flex items-center gap-1">
                              {getDeviceIcon(activity.device)} {activity.device}
                            </span>
                          )}

                          {activity.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3"/> {activity.location}
                            </span>
                          )}

                          {activity.ip_address && (
                            <span>IP: {activity.ip_address}</span>
                          )}
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </main>
  );
}

SettingsPage.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default SettingsPage;
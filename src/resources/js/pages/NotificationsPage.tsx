import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";

import {
  Bell,
  Heart,
  MessageCircle,
  ThumbsDown,
  FileText,
  Calendar,
  CheckCheck,
  Trash2,
} from "lucide-react";

/* ================= TYPES ================= */

interface Notification {
  id: string;
  type: "like" | "dislike" | "comment" | "post" | "task";
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  lien?: string;
}

type PageProps = {
  notifications?: any[];
  auth?: {
    user?: {
      id: number;
    };
  };
};

/* ================= PAGE ================= */

export function NotificationsPage() {
  const { props } = usePage<PageProps>();
  const userId = props.auth?.user?.id;

  /* ================= INIT ================= */

  const [notifications, setNotifications] = useState<Notification[]>(
    (props.notifications ?? []).map((n: any) => ({
      id: n.id,
      type: n.type,
      user: {
        name:
          `${n.data?.user?.prenom ?? ""} ${n.data?.user?.name ?? ""}`.trim(),
        avatar: n.user?.avatar ?? null,
      },
      content: n.content,
      timestamp: n.timestamp,
      isRead: n.est_lue ?? n.isRead ?? false,
      lien: n.lien ?? null,
    }))
  );

  /* ================= REALTIME ================= */

  useEffect(() => {
    if (!window.Echo || !userId) return;

    const channel = window.Echo.private(`users.${userId}`);

    const handler = (e: any) => {
      const newNotif: Notification = {
        id: e.id ?? Date.now().toString(),
        type: e.type,
        user: {
          name:
            `${e.data?.user?.prenom ?? ""} ${e.data?.user?.name ?? ""}`.trim() || "Utilisateur",
          avatar: e.avatar ?? null,
        },
        content: e.message,
        timestamp: "À l'instant",
        isRead: false,
        lien: e.lien ?? null,
      };

      setNotifications((prev) => [newNotif, ...prev]);
    };

    channel.listen(".notification.created", handler);

    return () => {
      channel.stopListening(".notification.created");
      window.Echo.leave(`users.${userId}`);
    };
  }, [userId]);

  /* ================= ACTIONS ================= */

  const handleMarkAsRead = async (id: string) => {
    await axios.post(`/notifications/${id}/read`);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/notifications/${id}`);

    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  const handleClick = async (notification: Notification) => {
    console.log(notification);
    if (!notification.isRead) {
      await handleMarkAsRead(notification.id);
    }

    //  redirect
    if (notification.lien) {
      window.location.href = notification.lien;
    }
  };

  /* ================= ICONS ================= */

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "dislike":
        return <ThumbsDown className="w-5 h-5 text-gray-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "post":
        return <FileText className="w-5 h-5 text-green-500" />;
      case "task":
        return <Calendar className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  /* ================= UI ================= */

  return (
    <main className="flex-1 space-y-4">
      <h1 className="text-xl font-bold">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification</p>
      ) : (
        notifications.map((notification) => (
          <Card
            key={notification.id}
            onClick={() => handleClick(notification)}
            className={`cursor-pointer ${
              !notification.isRead
                ? "bg-red-50 border-red-100"
                : ""
            }`}
          >
            <CardContent className="p-4 flex gap-3">

              {/* AVATAR */}
              <div className="relative">
                <Avatar>
                  <AvatarImage src={notification.user.avatar} />
                  <AvatarFallback>
                    {notification.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
                  {getIcon(notification.type)}
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">
                    {notification.user.name}
                  </span>{" "}
                    {notification.content}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {notification.timestamp}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-1">
                {!notification.isRead && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification.id);
                    }}
                  >
                    <CheckCheck className="w-4 h-4" />
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}

NotificationsPage.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default NotificationsPage;
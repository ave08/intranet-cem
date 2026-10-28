import { usePage } from "@inertiajs/react";
import { useState } from 'react';
import axios from "axios";
import { Layout } from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckSquare,
  Clock,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { Post, PostData } from "../components/Post";

/* ================= TYPES ================= */

type ReactionType = "like" | "dislike" | null;

type PostWithReaction = PostData & {
  user_reaction?: ReactionType;
};

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
};

type PageProps = {
  posts: PostWithReaction[];
  pendingPosts: PostData[];
  auth: {
    user: User;
  };
};

/* ================= PAGE ================= */

export function ProfilePage() {
  const { props } = usePage<PageProps>();

  const user = props.auth.user;
  const posts = props.posts || [];
  const [localPosts, setLocalPosts] = useState<PostWithReaction[]>(posts);
  const pendingPosts = props.pendingPosts || [];

  const avatarUrl = user.photo_profile
    ? `/storage/${user.photo_profile}`
    : "";

  const handleReaction = async (
    publicationId: string,
    type: "like" | "dislike"
  ) => {
    const post = localPosts.find((p) => p.id === publicationId);
    if (!post) return;

    const current = post.user_reaction;

    try {
      await axios.post(`/publication/${publicationId}/${type}`);

      setLocalPosts((prev) =>
        prev.map((p) => {
          if (p.id !== publicationId) return p;

          let likes = p.likes ?? 0;
          let dislikes = p.dislikes ?? 0;
          let newReaction: ReactionType = type;

          // 🔁 toggle off
          if (current === type) {
            newReaction = null;
            if (type === "like") likes--;
            if (type === "dislike") dislikes--;
          }

          // 🔁 switch reaction
          else if (current && current !== type) {
            if (type === "like") {
              likes++;
              dislikes--;
            } else {
              dislikes++;
              likes--;
            }
          }

          // ➕ first reaction
          else {
            if (type === "like") likes++;
            if (type === "dislike") dislikes++;
          }

          return {
            ...p,
            user_reaction: newReaction,
            likes,
            dislikes,
          };
        })
      );
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  const handleComment = async (id: string, text: string) => {
      try {
        await axios.post(`/publication/${id}/comment`, {
          contenu: text,
        });
  
        setLocalPosts((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  comments: (p.comments ?? 0) + 1,
                }
              : p
          )
        );
      } catch (err) {
        console.error("Comment error:", err);
      }
    };

  return (
    <main className="flex-1 space-y-4">

      {/* ===== PROFILE HEADER ===== */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">

            {/* AVATAR */}
            <Avatar className="w-28 h-28">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* INFOS */}
            <div className="flex-1">
              <h1 className="text-xl font-bold">
                {user.name} {user.prenom}
              </h1>

              {/* ROLE */}
              <p className="text-gray-500">
                {user.roles?.length ? user.roles.join(", ") : "Rôle non défini"}
              </p>

              {/* SERVICE */}
              <p className="text-sm text-gray-400">
                {user.service?.libelle ?? "Aucun service"}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                <div className="flex gap-2">
                  <Mail size={14} />
                  {user.email}
                </div>

                {user.phone && (
                  <div className="flex gap-2">
                    <Phone size={14} />
                    {user.phone}
                  </div>
                )}

                <div className="flex gap-2">
                  <MapPin size={14} />
                  Madagascar
                </div>

                <div className="flex gap-2">
                  <Calendar size={14} />
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* ===== TABS ===== */}
      <Tabs defaultValue="published">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="published">
            <FileText className="w-4 h-4 mr-2" />
            Publiées ({posts.length})
          </TabsTrigger>

          <TabsTrigger value="pending">
            <Clock className="w-4 h-4 mr-2" />
            En attente ({pendingPosts.length})
          </TabsTrigger>

          <TabsTrigger value="tasks">
            <CheckSquare className="w-4 h-4 mr-2" />
            Tâches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="mt-4 space-y-3">
          {posts.length === 0 ? (
            <p className="text-gray-500">Aucune publication</p>
          ) : (
            posts.map((post) => (
              <Post 
                key={post.id} 
                post={post} 
                onLike={() => handleReaction(post.id, "like")}
                onDislike={() => handleReaction(post.id, "dislike")}
                onComment={handleComment}
                />
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-3">
          {pendingPosts.length === 0 ? (
            <p className="text-gray-500">Aucune publication en attente</p>
          ) : (
            pendingPosts.map((post) => (
              <div key={post.id} className="relative">
                
                {/* Badge status */}
                <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded text-white">
                  En attente
                </span>

                <Post 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleReaction(post.id, "like")}
                  onDislike={() => handleReaction(post.id, "dislike")}
                  onComment={handleComment} />
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <p className="text-gray-500">
            Les tâches viendront du backend
          </p>
        </TabsContent>
      </Tabs>

    </main>
  );
}

ProfilePage.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default ProfilePage;
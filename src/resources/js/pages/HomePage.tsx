import { usePage , router } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

import { CreatePost } from "../components/CreatePost";
import { Post, PostData } from "../components/Post";
import { Layout } from "../components/Layout";

type ReactionType = "like" | "dislike" | null;

type PostWithReaction = PostData & {
  user_reaction?: ReactionType;
};

type PageProps = {
  posts: PostWithReaction[];
  auth: {
    user: {
      id: string;
      nom: string;
      prenom: string;
      photo_profile: string;
    };
  };
  flash?: {
    success?: string;
    error?: string;
  };
};

function HomePage() {
  const { posts = [] } = usePage<PageProps>().props;

  const { flash } = usePage().props as any;
  const [commentText, setCommentText] = useState('');
  const [localPosts, setLocalPosts] = useState<PostWithReaction[]>(posts);

  /* ================= CREATE POST ================= */

  const handleCreatePost = (
    content: string,
    files: File[],
    visibilite: "global" | "direction" | "service"
  ) => {
    // Inertia accepte un objet simple, il convertira en FormData si nécessaire
    router.post("/publication", {
      contenu: content,
      titre: "Publication",
      visibilite: visibilite,
      files: files, // Inertia gère les tableaux de fichiers nativement
    }, {
      forceFormData: true,
      onSuccess: () => {
        // Pas besoin de reload() ! Inertia met à jour les props (flash message)
        // et rafraîchit les données de la page automatiquement.
        console.log("Publication réussie");
      },
      onError: (errors) => {
        console.error("Erreur de création:", errors);
      },
    });
  };

  /* ================= REACTIONS ================= */

  const handleReaction = async (
    publication_id: string,
    type: "like" | "dislike"
  ) => {
    const post = localPosts.find((p) => p.id === publication_id);
    if (!post) return;

    const current = post.user_reaction;

    try {
      await axios.post("/reactions", {
        publication_id,   
        type,            
      });

      setLocalPosts((prev) =>
        prev.map((p) => {
          if (p.id !== publication_id) return p;

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

  /* ================= COMMENT ================= */

  const handleComment = (id: string, text: string) => {
    if (!text.trim()) return;

    router.post(`/publication/${id}/comment`, {
        contenu: text,
    }, {
        preserveScroll: true, // Garde le scroll du Dialog
        preserveState: true,  // Garde le Dialog ouvert
        onSuccess: () => {
            setCommentText(''); // Vide le champ texte
            // Inertia va automatiquement mettre à jour 'post.commentsList'
            // avec le nouveau commentaire venant de Laravel
        },
        onError: (errors) => {
            console.error("Erreur commentaire:", errors);
        }
    });
};

  /* ================= RENDER ================= */

  return (
    <main className="flex-1 w-full min-w-0 space-y-3 sm:space-y-4">
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

      <CreatePost onPost={handleCreatePost} />

      {localPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Aucune publication pour le moment.
        </p>
      ) : (
        localPosts.map((publication) => (
          <Post
            key={publication.id}
            post={publication}
            onLike={() => handleReaction(publication.id, "like")}
            onDislike={() => handleReaction(publication.id, "dislike")}
            onComment={handleComment}
          />
        ))
      )}
    </main>
  );
}

HomePage.layout = (page: React.ReactNode) => (
  <Layout>{page}</Layout>
);

export default HomePage;
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Layout } from "../components/Layout";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

import { Search, Check, X, Clock, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

/* ================= TYPES ================= */

type Media = {
  url?: string;
  file_path?: string;
  type?: string;
};

type Post = {
  id: number;
  contenu: string;
  visibilite: "global" | "direction" | "service";
  created_at: string;
  date_validation?: string;

  auteur?: {
    name?: string;
    prenom?: string;
    photo_profile?: string;
  };

  medias?: Media[];
};

/* ================= HELPERS ================= */

const getMediaUrl = (media: Media) => {
  if (media.url) return media.url;

  if (media.file_path) {
    return `/storage/${media.file_path.replace("public/", "")}`;
  }

  return null;
};

const getAvatarUrl = (path?: string) => {
  if (!path) return "/placeholder.png";
  return `/storage/${path}`;
};

/* ================= PAGE ================= */

function ContentManagerPage() {
  const { props } = usePage<{
    pendingPosts: Post[];
    approvedPosts: Post[];
    rejectedPosts: Post[];
  }>();

  const { flash } = usePage().props as any;

  const { pendingPosts = [], approvedPosts = [], rejectedPosts = [] } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  /* ================= ACTIONS ================= */

  const approvePost = (id: number) => {
    router.post(`/content/${id}/approve`, {}, {
      onSuccess: () => {
        router.reload({ only: ["pendingPosts", "approvedPosts"] });
      },
    });
  };

  const rejectPost = (id: number) => {
    router.post(`/content/${id}/reject`, {}, {
      onSuccess: () => {
        router.reload({ only: ["pendingPosts", "rejectedPosts"] });
      },
    });
  };

  const toggleExpand = (id: number) => {
    const set = new Set(expandedPosts);
    set.has(id) ? set.delete(id) : set.add(id);
    setExpandedPosts(set);
  };

  /* ================= FILTER ================= */

  const filterPosts = (posts: Post[]) => {
    return posts.filter((p) => {
      const nom = p.auteur?.name || "";
      const prenom = p.auteur?.prenom || "";

      return (
        (p.contenu || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (nom + " " + prenom).toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const filteredPending = filterPosts(pendingPosts);
  const filteredApproved = filterPosts(approvedPosts);
  const filteredRejected = filterPosts(rejectedPosts);

  /* ================= STATS ================= */

  const today = new Date().toISOString().slice(0, 10);

  const approvedToday = approvedPosts.filter(
    (p) => p.date_validation?.startsWith(today)
  ).length;

  const rejectedToday = rejectedPosts.filter(
    (p) => p.date_validation?.startsWith(today)
  ).length;

  /* ================= RENDER ================= */

  const renderPost = (post: Post) => {
    const expanded = expandedPosts.has(post.id);

    const authorNom = post.auteur?.name || "";
    const authorPrenom = post.auteur?.prenom || "";
    const authorPhoto = getAvatarUrl(post.auteur?.photo_profile);

    return (
      <Card key={post.id} className="mt-3">
        <CardContent className="p-4">
          <div className="flex gap-3">

            <Avatar>
              <AvatarImage src={authorPhoto} />
              <AvatarFallback>
                {authorNom.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">
                    {authorNom} {authorPrenom}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {post.visibilite} • {post.created_at}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <p className="mt-2 text-sm">
                {expanded
                  ? post.contenu
                  : (post.contenu?.slice(0, 120) ?? "") + "..."}
              </p>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleExpand(post.id)}
              >
                {expanded ? <ChevronUp /> : <ChevronDown />}
              </Button>

              {/* MEDIA FIX */}
              {expanded && Array.isArray(post.medias) && post.medias.length > 0 && (
                <div className="mt-2 space-y-2">
                  {post.medias.map((m, i) => {
                    const url = getMediaUrl(m);

                    if (!url) return null;

                    return (
                      <div key={i}>
                        {m.type === "image" && (
                          <img src={url} className="rounded w-full" />
                        )}

                        {m.type === "video" && (
                          <video src={url} controls className="w-full" />
                        )}

                        {m.type === "document" && (
                          <div className="mt-2 border p-4 rounded bg-white shadow-sm">
                            <p className="text-sm text-gray-500 mb-2 font-semibold">Document joint :</p>
                            {/* On essaie d'afficher si c'est un PDF, sinon on met un bouton */}
                            <iframe src={url} className="w-full h-64 mb-2 rounded border" />
                            <a 
                              href={url} 
                              download 
                              className="inline-block bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                            >
                              Télécharger le document
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* NO MEDIA */}
              {expanded && (!post.medias || post.medias.length === 0) && (
                <p className="text-xs text-gray-400 mt-2">
                  Aucun media
                </p>
              )}

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                <Button
                  className="bg-green-600 text-white"
                  onClick={() => approvePost(post.id)}
                >
                  <Check /> Approuver
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => rejectPost(post.id)}
                >
                  <X /> Rejeter
                </Button>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <main className="flex-1 space-y-4">
      {/*  Messages */}
          {flash?.success && (
            <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 text-sm border border-green-200">
              {flash?.success}
            </div>
          )}
          {flash?.error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
              {flash?.error}
            </div>
          )}
      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              {pendingPosts.length > 0 && (
                <Badge>
                  <h3 className="text-2xl font-bold text-orange-600">
                    {pendingPosts.length}
                  </h3>
                </Badge>
              )}
            </div>
            <Clock />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Approuvées aujourd'hui</p>
              <h3 className="text-2xl text-green-600">{approvedToday}</h3>
            </div>
            <CheckCircle2 />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejetées aujourd'hui</p>
              <h3 className="text-2xl text-red-600">{rejectedToday}</h3>
            </div>
            <XCircle />
          </CardContent>
        </Card>
      </div>

      {/* MAIN */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des publications</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="pending">

            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="pending">
                En attente <Badge className="ml-2">{pendingPosts.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Validées ({approvedPosts.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Refusées ({rejectedPosts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredPending.map(renderPost)}
            </TabsContent>

            <TabsContent value="approved">
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredApproved.map(renderPost)}
            </TabsContent>

            <TabsContent value="rejected">
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredRejected.map(renderPost)}
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}

ContentManagerPage.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default ContentManagerPage;
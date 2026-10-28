import { useState, useRef } from "react";
import { usePage } from "@inertiajs/react";
import { Image, Video, FileText } from "lucide-react";

import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type VisibiliteType = "global" | "direction" | "service";

interface CreatePostProps {
  onPost: (content: string, files: File[], visibilite: VisibiliteType) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const { props } = usePage<any>();
  const user = props.auth?.user;

  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [visibilite, setVisibilite] = useState<VisibiliteType>("global");
  const [isExpanded, setIsExpanded] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  /* ================= FILE HANDLER ================= */
  const handleFileSelect = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      newFiles.push(fileList[i]);
    }
    const selected = Array.from(fileList).filter(file => file.size <= 100 * 1024 * 1024); // 100 Mo max
    if (selected.length < fileList.length) alert("Certains fichiers sont trop gros (>100 Mo)");

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= POST ================= */
  const handlePost = () => {
    if (!content.trim() && files.length === 0) return;

    onPost(content, files, visibilite);

    setContent("");
    setFiles([]);
    setVisibilite("global");
    setIsExpanded(false);
  };

  /* ================= AVATAR ================= */
  const avatarUrl = user?.photo_profile
    ? `/storage/${user.photo_profile}`
    : "";

  const fallbackLetter = user?.nom?.charAt(0) || "U";

  return (
    <Card>
      <CardContent className="p-3 sm:p-4">

        {/* INPUTS */}
        <input
          ref={photoInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.currentTarget.files)}
        />

        <input
          ref={videoInputRef}
          type="file"
          multiple
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.currentTarget.files)}
        />

        <input
          ref={documentInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.currentTarget.files)}
        />

        <div className="flex gap-2 sm:gap-3">

          {/* AVATAR */}
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fallbackLetter}</AvatarFallback>
          </Avatar>

          <div className="flex-1">

            <Textarea
              placeholder="Partager une actualité..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
            />

            {/* PREVIEW MULTI */}
            {files.length > 0 &&
              files.map((file, index) => (
                <div key={index} className="mt-2 relative border rounded p-2">

                  {file.type.startsWith("image") && (
                    <img
                      src={URL.createObjectURL(file)}
                      className="max-h-64 w-full object-cover"
                    />
                  )}

                  {file.type.startsWith("video") && (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="max-h-64 w-full"
                    />
                  )}

                  {!file.type.startsWith("image") &&
                    !file.type.startsWith("video") && (
                      <div className="flex items-center gap-2">
                        <FileText />
                        <span>{file.name}</span>
                      </div>
                    )}

                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-black text-white px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}

            {isExpanded && (
              <div className="mt-3 space-y-3">

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <Button onClick={() => photoInputRef.current?.click()}>
                    <Image /> Photo
                  </Button>

                  <Button onClick={() => videoInputRef.current?.click()}>
                    <Video /> Vidéo
                  </Button>

                  <Button onClick={() => documentInputRef.current?.click()}>
                    <FileText /> Document
                  </Button>
                </div>

                {/* VISIBILITÉ */}
                <select
                  value={visibilite}
                  onChange={(e) =>
                    setVisibilite(e.target.value as VisibiliteType)
                  }
                  className="border p-2 rounded w-full"
                >
                  <option value="global">Global</option>
                  <option value="direction">Direction</option>
                  <option value="service">Service</option>
                </select>

                {/* BUTTONS */}
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setContent("");
                      setFiles([]);
                      setIsExpanded(false);
                    }}
                  >
                    Annuler
                  </Button>

                  <Button
                    onClick={handlePost}
                    disabled={!content.trim() && files.length === 0}
                  >
                    Publier
                  </Button>
                </div>

              </div>
            )}

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
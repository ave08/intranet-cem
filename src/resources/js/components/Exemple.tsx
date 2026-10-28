import { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, X, ChevronLeft, ChevronRight, Globe, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export interface Comment {
    id: string;
    author: { name: string; avatar: string; role: string };
    text: string;
    timestamp: string;
    likes: number;
    dislikes: number;
    isLiked?: boolean;
    isDisliked?: boolean;
    replies?: Comment[];
}

export interface PostData {
    id: string;

    auteur?: {
        nom?: string;
        prenom?: string;
        role?: string;
        photo_profile?: string;
    };

    content?: string;

    visibilite: "global" | "direction" | "service";

    media?: {
        url: string;
        type: "image" | "video" | "document";
    }[];

    timestamp?: string;

    likes?: number;
    dislikes?: number;
    comments?: number;

    user_reaction?: "like" | "dislike" | null;
    isLiked?: boolean;
    isDisliked?: boolean;
    likedBy?: { name: string; avatar: string }[];
    dislikedBy?: { name: string; avatar: string }[];
    commentsList?: Comment[];
}

interface PostProps {
    post: PostData;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
    onComment: (id: string, comment: string) => void;
}

export function Post({ post, onLike, onDislike, onComment }: PostProps) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [showReactionsDialog, setShowReactionsDialog] = useState(false);
    const [reactionsTab, setReactionsTab] = useState<'likes' | 'dislikes'>('likes');
    const [showPostDialog, setShowPostDialog] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [, setOpenCommentsInDialog] = useState(false);

    const [comments, setComments] = useState<Comment[]>(post.commentsList || []);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const allMedia = post.media ?? [];
    const auteurName = `${post.auteur?.prenom ?? ''} ${post.auteur?.nom ?? ''}`;
    const auteurAvatar = post.auteur?.photo_profile ?? '';

    /* ================= MEDIA RENDER ================= */

    const renderMediaPreview = (media: any) => {
        if (media.type === "image") {
            return <img src={media.url} className="w-full h-full object-cover" />;
        }

        if (media.type === "video") {
            return <video src={media.url} className="w-full h-full object-cover" muted />;
        }

        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-gray-700">
                📄 Document
            </div>
        );
    };

    const handleComment = () => {
        if (commentText.trim()) {
            onComment(post.id, commentText);
            setCommentText('');
        }
    };

    const handleOpenReactions = (tab: 'likes' | 'dislikes') => {
        setReactionsTab(tab);
        setShowReactionsDialog(true);
    };

    /* ================= NAV ================= */

    const handleNext = () => setSelectedIndex((p) => (p + 1) % allMedia.length);
    const handlePrev = () => setSelectedIndex((p) => (p - 1 + allMedia.length) % allMedia.length);

    const handleOpenPostDialog = (index = 0, openComments = false) => {
        setSelectedIndex(index);
        setOpenCommentsInDialog(openComments);
        setShowPostDialog(true);
    };

    const handleCommentLike = (commentId: string, parentId?: string) => {
        setComments((prev) => updateCommentReaction(prev, commentId, 'like', parentId));
    };

    const handleCommentDislike = (commentId: string, parentId?: string) => {
        setComments((prev) => updateCommentReaction(prev, commentId, 'dislike', parentId));
    };

    const updateCommentReaction = (
        commentsList: Comment[],
        commentId: string,
        type: 'like' | 'dislike',
        _parentId?: string,
    ): Comment[] => {
        return commentsList.map((comment) => {
            if (comment.id === commentId) {
                if (type === 'like') {
                    return {
                        ...comment,
                        isLiked: !comment.isLiked,
                        isDisliked: false,
                        likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                        dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes,
                    };
                } else {
                    return {
                        ...comment,
                        isDisliked: !comment.isDisliked,
                        isLiked: false,
                        dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
                        likes: comment.isLiked ? comment.likes - 1 : comment.likes,
                    };
                }
            }

            if (comment.replies) {
                return {
                    ...comment,
                    replies: updateCommentReaction(comment.replies, commentId, type),
                };
            }

            return comment;
        });
    };

    const handleReply = (commentId: string) => {
        if (replyText.trim()) {
            const newReply: Comment = {
                id: Date.now().toString(),
                author: {
                    name: 'Moi',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                    role: 'Employé',
                },
                text: replyText,
                timestamp: "À l'instant",
                likes: 0,
                dislikes: 0,
                isLiked: false,
                isDisliked: false,
            };

            setComments((prev) => addReplyToComment(prev, commentId, newReply));

            setReplyText('');
            setReplyingTo(null);
        }
    };

    const addReplyToComment = (commentsList: Comment[], commentId: string, reply: Comment): Comment[] => {
        return commentsList.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), reply],
                };
            }

            if (comment.replies) {
                return {
                    ...comment,
                    replies: addReplyToComment(comment.replies, commentId, reply),
                };
            }

            return comment;
        });
    };

    const getVisibilityIcon = (_visibility?: string) => {
        return <Globe className="w-3 h-3" />;
    };

    const renderComment = (comment: Comment, depth: number = 0, parentId?: string) => {
        const isReplying = replyingTo === comment.id;

        return (
            <div key={comment.id} className={depth > 0 ? 'ml-8 mt-3' : 'mt-3'}>
                <div className="flex gap-2">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="bg-gray-100 rounded-2xl px-3 py-2">
                            <p className="font-semibold text-xs">{comment.author.name}</p>
                            <p className="text-sm text-gray-800 break-words">{comment.text}</p>
                        </div>

                        <div className="flex items-center gap-3 mt-1 ml-3 text-xs">
                            <button
                                onClick={() => handleCommentLike(comment.id, parentId)}
                                className={`font-semibold hover:underline ${comment.isLiked ? 'text-red-500' : 'text-gray-600'}`}
                            >
                                J'aime {comment.likes > 0 && `(${comment.likes})`}
                            </button>
                            <button
                                onClick={() => handleCommentDislike(comment.id, parentId)}
                                className={`font-semibold hover:underline ${comment.isDisliked ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                Je n'aime pas {comment.dislikes > 0 && `(${comment.dislikes})`}
                            </button>
                            <button
                                onClick={() => setReplyingTo(isReplying ? null : comment.id)}
                                className="font-semibold text-gray-600 hover:underline"
                            >
                                Répondre
                            </button>
                            <span className="text-gray-400">{comment.timestamp}</span>
                        </div>

                        {isReplying && (
                            <div className="flex gap-2 mt-2">
                                <Avatar className="w-6 h-6 flex-shrink-0">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                                    <AvatarFallback>ME</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <Textarea
                                        placeholder="Écrire une réponse..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="min-h-[40px] resize-none text-sm"
                                        autoFocus
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setReplyingTo(null);
                                                setReplyText('');
                                            }}
                                            className="text-xs"
                                        >
                                            Annuler
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleReply(comment.id)}
                                            disabled={!replyText.trim()}
                                            className="text-white hover:opacity-90 text-xs"
                                            style={{ background: '#e2001a' }}
                                        >
                                            Répondre
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-2">{comment.replies.map((reply) => renderComment(reply, depth + 1, comment.id))}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    /* ================= GRID ================= */

    const renderImageGrid = () => {
        if (allMedia.length === 0) return null;

        const display = allMedia.slice(0, 4);
        const remaining = allMedia.length - 4;

        return (
            <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden -mx-3 sm:mx-0">
                {display.map((media, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-square cursor-pointer"
                        onClick={() => handleOpenPostDialog(idx)}
                    >
                        {renderMediaPreview(media)}

                        {idx === 3 && remaining > 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-3xl font-bold">+{remaining}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const currentMedia = allMedia[selectedIndex];

    return (
        <>
            <Card>
                <CardHeader className="pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-2 sm:gap-3">
                            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                                <AvatarImage src={auteurAvatar} />
                                <AvatarFallback>{auteurName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">{auteurName}</p>
                                <p className="text-xs sm:text-sm text-gray-500 truncate">{post.auteur?.role}</p>
                                <p className="text-xs text-gray-400 mt-1">{post.timestamp}</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
                    <p className="text-sm sm:text-base text-gray-800 whitespace-pre-wrap break-words">{post.content}</p>

                    {renderImageGrid()}

                    <div className="flex items-center justify-between py-2 border-t border-b border-gray-100 text-xs sm:text-sm">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button onClick={() => handleOpenReactions('likes')} className="text-gray-500 hover:underline cursor-pointer">
                                {post.likes} j'aime
                            </button>
                            <button onClick={() => handleOpenReactions('dislikes')} className="text-gray-500 hover:underline cursor-pointer">
                                {post.dislikes} je n'aime pas
                            </button>
                        </div>
                        <button onClick={() => handleOpenPostDialog(0, true)} className="text-gray-500 hover:underline cursor-pointer">
                            {post.comments} {post.comments === 1 ? 'commentaire' : 'commentaires'}
                        </button>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onLike(post.id)}
                            className={`flex-1 text-xs sm:text-sm px-2 sm:px-3 ${post.isLiked ? 'text-red-500' : 'text-gray-600'}`}
                        >
                            <ThumbsUp className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span className="hidden sm:inline">J'aime</span>
                            <span className="sm:hidden">Like</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDislike(post.id)}
                            className={`flex-1 text-xs sm:text-sm px-2 sm:px-3 ${post.isDisliked ? 'text-blue-600' : 'text-gray-600'}`}
                        >
                            <ThumbsDown className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 ${post.isDisliked ? 'fill-current' : ''}`} />
                            <span className="hidden sm:inline">Je n'aime pas</span>
                            <span className="sm:hidden">Dislike</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowComments(!showComments)}
                            className="flex-1 text-xs sm:text-sm px-2 sm:px-3 text-gray-600"
                        >
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Commenter</span>
                            <span className="sm:hidden">Comment</span>
                        </Button>
                    </div>

                    {showComments && (
                        <div className="space-y-3 pt-3 border-t border-gray-100">
                            <div className="flex gap-2">
                                <Avatar className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                                    <AvatarFallback>ME</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <Textarea
                                        placeholder="Écrire un commentaire..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="min-h-[50px] sm:min-h-[60px] resize-none text-xs sm:text-sm"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            size="sm"
                                            onClick={handleComment}
                                            disabled={!commentText.trim()}
                                            className="text-white hover:opacity-90 text-xs sm:text-sm"
                                            style={{ background: '#e2001a' }}
                                        >
                                            Commenter
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={showReactionsDialog} onOpenChange={setShowReactionsDialog}>
                <DialogContent className="max-w-md">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-3">
                            <h3 className="text-lg font-semibold">Réactions</h3>
                            <button onClick={() => setShowReactionsDialog(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex gap-2 border-b">
                            <button
                                onClick={() => setReactionsTab('likes')}
                                className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                                    reactionsTab === 'likes' ? 'border-b-2 text-gray-900' : 'text-gray-500'
                                }`}
                                style={reactionsTab === 'likes' ? { borderColor: '#e2001a' } : {}}
                            >
                                J'aime ({post.likes})
                            </button>
                            <button
                                onClick={() => setReactionsTab('dislikes')}
                                className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                                    reactionsTab === 'dislikes' ? 'border-b-2 text-gray-900' : 'text-gray-500'
                                }`}
                                style={reactionsTab === 'dislikes' ? { borderColor: '#e2001a' } : {}}
                            >
                                Je n'aime pas ({post.dislikes})
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-2">
                            {reactionsTab === 'likes' ? (
                                post.likedBy && post.likedBy.length > 0 ? (
                                    post.likedBy.map((user, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{user.name}</p>
                                            </div>
                                            <ThumbsUp className="w-5 h-5 text-red-500 fill-current" />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-8">Aucune réaction</p>
                                )
                            ) : post.dislikedBy && post.dislikedBy.length > 0 ? (
                                post.dislikedBy.map((user, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{user.name}</p>
                                        </div>
                                        <ThumbsDown className="w-5 h-5 text-blue-600 fill-current" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">Aucune réaction</p>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
                <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0">
                    <div className="flex h-full flex-col lg:flex-row">
                        <div className="relative flex-1 bg-black flex items-center justify-center min-h-0">
                            {currentMedia?.type === "image" && (
                                <img src={currentMedia.url} className="max-h-full max-w-full object-contain" />
                            )}

                            {currentMedia?.type === "video" && (
                                <video src={currentMedia.url} controls autoPlay className="max-h-full max-w-full object-contain" />
                            )}

                            {currentMedia?.type === "document" && (
                                <iframe src={currentMedia.url} className="w-full h-full bg-white" />
                            )}

                            {allMedia.length > 1 && (
                                <>
                                    <button onClick={handlePrev} className="absolute left-2">
                                        <ChevronLeft />
                                    </button>
                                    <button onClick={handleNext} className="absolute right-2">
                                        <ChevronRight />
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => setShowPostDialog(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center lg:hidden transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="w-full lg:w-96 xl:w-[450px] bg-white flex flex-col max-h-[40vh] lg:max-h-full border-l">
                            <div className="p-4 border-b">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex gap-3 flex-1 min-w-0">
                                        <Avatar className="w-10 h-10 flex-shrink-0">
                                            <AvatarImage src={auteurAvatar} />
                                            <AvatarFallback>
                                                {auteurName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm truncate">{auteurName}</p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <span>{post.timestamp}</span>
                                                <span>•</span>
                                                {getVisibilityIcon(post.visibilite)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="text-gray-400 hover:text-gray-600 hidden lg:block">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setShowPostDialog(false)}
                                            className="text-gray-400 hover:text-gray-600 hidden lg:block"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{post.content}</p>
                            </div>

                            <div className="px-4 py-2 border-b">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <div className="flex -space-x-1">
                                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border border-white">
                                                <ThumbsUp className="w-3 h-3 text-white fill-current" />
                                                <button onClick={() => handleOpenReactions('likes')} className="text-gray-600 hover:underline ml-1">
                                                    {post.likes}
                                                </button>
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center border border-white">
                                                <ThumbsDown className="w-3 h-3 text-white fill-current" />
                                                <button onClick={() => handleOpenReactions('likes')} className="text-gray-600 hover:underline ml-1">
                                                    {post.dislikes}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <span>{comments.length} commentaires</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-2 py-1 border-b flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onLike(post.id)}
                                    className={`flex-1 text-xs ${post.isLiked ? 'text-red-500' : 'text-gray-600'}`}
                                >
                                    <ThumbsUp className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                                    J'aime
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDislike(post.id)}
                                    className={`flex-1 text-xs ${post.isDisliked ? 'text-blue-600' : 'text-gray-600'}`}
                                >
                                    <ThumbsDown className={`w-4 h-4 mr-1 ${post.isDisliked ? 'fill-current' : ''}`} />
                                    Je n'aime pas
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-1">
                                {comments.length > 0 ? (
                                    comments.map((comment) => renderComment(comment))
                                ) : (
                                    <div className="text-center py-8">
                                        <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                                        <p className="text-gray-500 text-sm">Aucun commentaire</p>
                                        <p className="text-gray-400 text-xs">Soyez le premier à commenter</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 border-t bg-white">
                                <div className="flex gap-2">
                                    <Avatar className="w-8 h-8 flex-shrink-0">
                                        <AvatarImage src={auteurAvatar} />
                                        <AvatarFallback>{auteurName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 flex gap-2">
                                        <Textarea
                                            placeholder="Écrire un commentaire..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            className="min-h-[36px] max-h-[100px] resize-none text-sm rounded-full px-4 py-2"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleComment();
                                                }
                                            }}
                                        />
                                        {commentText.trim() && (
                                            <Button
                                                size="sm"
                                                onClick={handleComment}
                                                className="text-white hover:opacity-90 self-end"
                                                style={{ background: '#e2001a' }}
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

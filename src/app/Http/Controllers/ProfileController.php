<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Publication;
use App\Models\User;
use App\Models\Service;
use App\Models\Role;

class ProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $posts = Publication::with(['auteur', 'medias','reactions','commentaires'])
        ->where('statut', 'valide')
        ->where('auteur_id', $user->id)
        ->latest()
        ->get()
        ->map(function ($publication) {
            return [
                'id' => (string) $publication->id,
                'auteur' => [
                    'nom' => $publication->auteur->name . ' ' . $publication->auteur->prenom,
                    'role' => $publication->auteur->roles->pluck('name')->join(', '),
                    'avatar' => $publication->auteur->photo_profile
                    ? Storage::url($publication->auteur->photo_profile)
                    : null,
                ],
                'content' => $publication->contenu,
                'visibilite' => $publication->visibilite,

                'media' => $publication->medias->map(fn($m) => [
                    'url' => asset('storage/' . str_replace('public/', '', $m->file_path)),
                    'type' => $m->type,
                ]),

                'timestamp' => $publication->created_at->diffForHumans(),

                'likes' => $publication->reactions->where('type', 'like')->count(),
                'dislikes' => $publication->reactions->where('type', 'dislike')->count(),
                'comments' => $publication->commentaires->count(),
            ];
        });

        $pendingPosts = Publication::with(['auteur', 'medias','reactions','commentaires'])
        ->where('statut', 'en_attente')
        ->where('auteur_id', $user->id)
        ->latest()
        ->get()
        ->map(function ($publication) {
            return [
                'id' => (string) $publication->id,
                'auteur' => [
                    'nom' => $publication->auteur->name . ' ' . $publication->auteur->prenom,
                    'role' => $publication->auteur->roles->pluck('name')->join(', '),
                    'avatar' => $publication->auteur->photo_profile
                    ? Storage::url($publication->auteur->photo_profile)
                    : null,
                ],
                'content' => $publication->contenu,
                'visibilite' => $publication->visibilite,

                'media' => $publication->medias->map(fn($m) => [
                    'url' => asset('storage/' . str_replace('public/', '', $m->file_path)),
                    'type' => $m->type,
                ]),

                'timestamp' => $publication->created_at->diffForHumans(),

            ];
        });


        return Inertia::render('ProfilePage', [
            'posts' => $posts,
            'pendingPosts' => $pendingPosts,
        ]);
    }
}

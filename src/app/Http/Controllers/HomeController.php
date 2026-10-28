<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Publication;
use Illuminate\Support\Facades\Storage;


class HomeController extends Controller
{
    public function index()
    { 
        $user = auth()->user();

        $posts = Publication::with(['auteur', 'medias','reactions','commentaires'])
        ->where('statut', 'valide')
        ->where(function ($query) use ($user) {

            // 🌍 Global → tout le monde
            $query->where('visibilite', 'global')

                // 🏢 Direction
                ->orWhere(function ($q) use ($user) {
                    $q->where('visibilite', 'direction')
                    ->whereHas('auteur', function($a) use ($user) {
                        $a->where('direction_id', $user->direction_id);
                    });
                })
                ->orWhere(function ($q) use ($user) {
                    $q->where('visibilite', 'service')
                    ->whereHas('auteur', function($a) use ($user) {
                        $a->where('service_id', $user->service_id);
                    });
                });
        })
        ->latest()
        ->get()
        ->map(function ($publication) use ($user) {
            return [
                'id' => (string) $publication->id,
                'auteur' => [
                    'nom' => $publication->auteur->name,
                    'prenom' => $publication->auteur->prenom,
                    'role' => 'Employé',
                    'photo_profile' => $publication->auteur->photo_profile
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
                'commentsList' => $publication->commentaires->map(function ($c) {
                    return [
                        'id' => $c->id,
                        'text' => $c->contenu,
                        'timestamp' => $c->created_at->diffForHumans(),

                        'auteur' => [
                            'id' => $c->auteur->id,
                            'nom' => $c->auteur->name,
                            'prenom' => $c->auteur->prenom,
                            'photo_profile' => $c->auteur->photo_profile
                                ? Storage::url($c->auteur->photo_profile)
                                : null,
                        ],
                    ];
                }),

                'replies' => [],

                'user_reaction' => $publication->reactions
                ->where('user_id', $user->id)
                ->first()
                ?->type,
            ];
        });

        return Inertia::render('HomePage', [
            'posts' => $posts
        ]);
    }
}

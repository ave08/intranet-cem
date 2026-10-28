<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Publication;
use App\Services\NotificationService;
use App\Models\User;

class ContentController extends Controller
{
    public function index()
    {
        $pending = Publication::with(['auteur', 'medias'])
            ->where('statut', 'en_attente')
            ->latest()
            ->get();

        $approved = Publication::with(['auteur', 'medias'])
            ->where('statut', 'valide')
            ->latest()
            ->get();

        $rejected = Publication::with(['auteur', 'medias'])
            ->where('statut', 'refuse')
            ->latest()
            ->get();

        return inertia('ContentManagerPage', [
            'pendingPosts' => $pending,
            'approvedPosts' => $approved,
            'rejectedPosts' => $rejected,
        ]);
    }

    public function approve($id)
    {
        $publication = Publication::with('auteur')->findOrFail($id);
        $publication->update([
                    'statut' => 'valide',
                    'date_validation' => now(),
                    'date_publication' => now()
        ]);
        $author = $publication->auteur;

        // Notifier l'auteur
        NotificationService::send(
            $author->id,
            'approvedPosts',
            "votre publication a été approuvée",
            "/publications/" . $publication->id,
            [
                'publication_id' => $publication->id,
                'user' => [
                        'name' => $author->name,
                        'prenom' => $author->prenom,
                        'avatar' => $author->photo_profile,
                    ],
            ]
        );

        // Notifier TOUS les users (feed temps réel)
        $users = User::where('id', '!=', $author->id)->get();

        foreach ($users as $user) {
            NotificationService::send(
                $user->id,
                'newPost',
                " a publié une nouvelle publication",
                "/publications/" . $publication->id,
                [
                    'publication_id' => $publication->id,
                    'user' => [
                        'name' => $author->name,
                        'prenom' => $author->prenom,
                        'avatar' => $author->photo_profile,
                    ],
                ]
            );
        }

        $publication->save();
        return redirect()->route('content')->with('success', 'Publication validé');
    }

    public function reject($id)
    {
        $publication = Publication::with('auteur')->findOrFail($id);

        $publication->update([
            'statut' => 'refuse'
        ]);
            NotificationService::send(
                $publication->auteur_id, // ID
                'rejectedPosts',
                "Votre publication a été refusée",
                "/publications/" . $publication->id,
                [
                    'publication_id' => $publication->id,
                ]
            );
        return redirect()->route('content')->with('error', 'Publication refusé');
    }
}
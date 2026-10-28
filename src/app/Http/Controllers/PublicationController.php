<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use Illuminate\Http\Request;
use App\Services\NotificationService;
use App\Models\User;

class PublicationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'contenu' => 'nullable|string',
            'files.*' => 'file|max:102480',
        ]);

        $publication = Publication::create([
            'titre' => $request->titre ?? 'Publication',
            'contenu' => $request->contenu,
            'visibilite' => $request->visibilite ?? 'global',
            'statut' => 'en_attente',
            'auteur_id' => auth()->id(),
        ]);

        // Upload fichiers
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {

                $path = $file->store('publications', 'public');

                $type = str_contains($file->getMimeType(), 'image')
                    ? 'image'
                    : (str_contains($file->getMimeType(), 'video') ? 'video' : 'document');

                $publication->medias()->create([
                    'file_path' => $path,
                    'type' => $type,
                ]);
            }
        }

        $contentManagers = User::whereHas('roles', function ($q) {
            $q->where('name', 'Content_manager');
        })->get();

        foreach ($contentManagers as $manager) {
            NotificationService::send(
                $manager->id, 
                'pendingPosts',
                "a soumis une publication",
                "/content",
                [
                    'publication_id' => $publication->id,
                    'user' => [
                        'name' => $publication->auteur->name ?? auth()->user()->name,
                        'prenom' => $publication->auteur->prenom ?? auth()->user()->prenom,
                        'avatar' => $publication->auteur->photo_profile ?? auth()->user()->photo_profile,
                    ],
                ]
            );
        }

        return redirect()->route('Home')->with('success', 'Publication en attente de validation');
    }

}
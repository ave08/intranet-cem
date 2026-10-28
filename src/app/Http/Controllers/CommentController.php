<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commentaire;
use App\Models\Publication;
use App\Models\User;
use App\Services\NotificationService;

class CommentController extends Controller
{
    public function comment(Request $request, $publicationId)
    {
        try {
            $request->validate([
                'contenu' => 'required|string',
                'parent_id' => 'nullable|exists:commentaires,id',
            ]);

            $user = auth()->user();
            $publication = Publication::findOrFail($publicationId);

            $comment = Commentaire::create([
                'auteur_id' => $user->id,
                'publication_id' => $publication->id,
                'parent_id' => $request->parent_id,
                'contenu' => $request->contenu,
            ]);

            // COMMENTAIRE SUR PUBLICATION
            if (!$request->parent_id) {

                if ($publication->auteur_id !== $user->id) {

                    NotificationService::send(
                        $publication->auteur_id,
                        'comment',
                        $user->name . " a commenté votre publication",
                        "/publications/" . $publication->id
                    );
                }

            }

            // RÉPONSE
            else {

                $parent = Commentaire::find($request->parent_id);

                if ($parent && $parent->auteur_id !== $user->id) {

                    NotificationService::send(
                        $parent->auteur_id,
                        'reply',
                        $user->name . " a répondu à votre commentaire",
                        "/publications/" . $publication->id
                    );
                }
            }

            return back()->with(
                'success' , 'Votre commentaire a bien été envoyé'
            );

        } catch (\Exception $e) {

            return back()->with([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function list($id)
    {
        $comments = Commentaire::with('auteur')
            ->where('publication_id', $id)
            ->whereNull('parent_id')
            ->latest()
            ->paginate(10);

        return response()->json($comments->map(function ($c) {
            return [
                'id' => $c->id,
                'contenu' => $c->contenu,
                'auteur' => [
                    'nom' => $c->auteur->name,
                    'prenom' => $c->auteur->prenom,
                    'photo_profile' => $c->auteur->photo_profile,
                ],
            ];
        }));
    }
}
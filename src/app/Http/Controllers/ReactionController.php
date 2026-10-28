<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reaction;
use App\Models\Publication;
use App\Models\Commentaire;
use App\Services\NotificationService;

class ReactionController extends Controller
{
    public function react(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'type' => 'required|in:like,dislike',
            'publication_id' => 'nullable|exists:publications,id',
            'commentaire_id' => 'nullable|exists:commentaires,id',
        ]);
    
        if (!$request->publication_id && !$request->commentaire_id) {
            return response()->json([
                'message' => 'publication_id ou commentaire_id requis'
            ], 422);
        }

        $type = $request->type;

        $publication = $request->publication_id
            ? Publication::find($request->publication_id)
            : null; 

        $commentaire = $request->commentaire_id
            ? Commentaire::find($request->commentaire_id)
            : null;

        if (!in_array($type, ['like', 'dislike'])) {
            return response()->json(['error' => 'Type invalide'], 400);
        }

        if ($publication->statut === 'en_attente') {
            return response()->json([
                'message' => 'Action non autorisée'
            ], 403);
        }

        // On cherche si la réaction existe déjà
        $reaction = Reaction::where('user_id', $user->id)
            ->where('publication_id', $request->publication_id)
            ->where('commentaire_id', $request->commentaire_id)
            ->first();

            if ($reaction) {

                // même type → suppression (toggle off)
                if ($reaction->type === $type) {
                    $reaction->delete();

                    return response()->json([
                        'state' => null
                    ]);
                }

                // changement like ↔ dislike
                $reaction->update([
                    'type' => $type
                ]);

                $this->notify($publication, $commentaire, $user, $type);

                return response()->json([
                    'state' => $type
                ]);
            }

            Reaction::create([
                'user_id' => $user->id,
                'publication_id' => $request->publication_id,
                'commentaire_id' => $request->commentaire_id,
                'type' => $type,
            ]);

        $this->notify($publication, $commentaire, $user, $type);

        return response()->json(['state' => $type]);
    }

    private function notify($publication, $commentaire, $user, $type)
    {
        try {

            // ================= COMMENTAIRE =================
            if ($commentaire) {

                if (!$commentaire->auteur_id || $commentaire->auteur_id === $user->id) {
                    return;
                }

                NotificationService::send(
                    $commentaire->auteur_id,
                    $type,
                    $user->name . " a " . ($type === 'like' ? 'aimé' : 'n\'a pas aimé') . " votre commentaire",
                    "/publications/" . $commentaire->publication_id
                );

                return;
            }

            // ================= PUBLICATION =================
            if ($publication) {

                if (!$publication->auteur_id || $publication->auteur_id === $user->id) {
                    return;
                }

                NotificationService::send(
                    $publication->auteur_id,
                    $type,
                    $user->name . " a " . ($type === 'like' ? 'aimé' : 'n\'a pas aimé') . " votre publication",
                    "/publications/" . $publication->id
                );
            }

        } catch (\Throwable $e) {
            \Log::error('Notification error: ' . $e->getMessage());
        }
    }
}

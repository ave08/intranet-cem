<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()
            ->notifications()
            ->latest()
            ->take(50)
            ->get()
            ->map(function ($notification) {
                $data = $notification->data ?? [];

                $postId = $data['publication_id'] ?? null;
                return [
                    'id' => (string) $notification->id,
                    'type' => $notification->type,

                    'user' => [
                        'name' =>
                            trim(($data['user']['prenom'] ?? '') . ' ' . ($data['user']['name'] ?? 'Utilisateur')),

                        'avatar' => $data['user']['avatar'] ?? null,
                    ],

                    'content' => $notification->message,

                    'data' => $notification->data,

                    'timestamp' => $notification->created_at->diffForHumans(),

                    'isRead' => (bool) $notification->est_lue,

                    'lien' => $postId ? route('Home', ['open_post' => $postId]) : $notification->lien,
                ];
            });

        return Inertia::render('NotificationsPage', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead($id)
    {
        $notification = auth()->user()
            ->notifications()
            ->where('id', $id)
            ->firstOrFail();

        $notification->update([
            'est_lue' => true
        ]);

        return back();
    }

    public function delete($id)
    {
        $notification = auth()->user()
            ->notifications()
            ->where('id', $id)
            ->firstOrFail();

        $notification->delete();

        return back();
    }

    public function markAllAsRead()
    {
        auth()->user()
            ->notifications()
            ->update(['est_lue' => true]);

        return back();
    }
}

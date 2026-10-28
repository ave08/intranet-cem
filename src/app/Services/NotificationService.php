<?php

namespace App\Services;

use App\Models\Notification;
use App\Events\NotificationCreated;
use App\Models\User;
use App\Notifications\GenericNotification;

class NotificationService
{
    public static function send($user, $type, $message, $lien = null, $extra = [])
    {
        $userId = $user instanceof User ? $user->id : $user;
        // 1. Save DB
        $notification = Notification::create([
            'user_id' => $userId,
            'type' => $type,
            'message' => $message,
            'lien' => $lien,
            'est_lue' => false,
            'data' => $extra
        ]);

        // 2. Broadcast event
        event(new NotificationCreated($notification));

        return $notification;
    }
}
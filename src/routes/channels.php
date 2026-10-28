<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;
use App\Models\Role;

Broadcast::channel('users.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

/* Admin channel */
Broadcast::channel('admin-channel', function ($user) {
    return $user->roles->contains('name', 'Administrateur');
});

/* Content manager channel */
Broadcast::channel('content-channel', function ($user) {
    return $user->roles->contains('name', 'Content_manager');
});

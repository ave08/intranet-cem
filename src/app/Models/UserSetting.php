<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserSetting extends Model
{
    protected $fillable = [
        'user_id',
        'email_notifications',
        'push_notifications',
        'mention_notifications',
        'comment_notifications',
        'like_notifications',
        'profile_visibility',
        'show_email',
        'show_phone',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

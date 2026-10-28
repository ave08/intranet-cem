<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'message',
        'lien',
        'est_lue',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
        'est_lue' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

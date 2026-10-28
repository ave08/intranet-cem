<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class HistoriqueAction extends Model
{
    protected $table = 'historique_actions';

    protected $fillable = [
        'user_id',
        'type_action',
        'date_action',
        'ancienne_valeur',
        'nouvelle_valeur',
        'device',
        'ip_address',
        'location',
    ];

    protected $casts = [
        'date_action' => 'datetime',
    ];

    /* RELATIONS */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

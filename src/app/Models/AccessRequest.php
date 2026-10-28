<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessRequest extends Model
{
    protected $fillable = [
        'user_id',
        'nom_temp',
        'prenom_temp',
        'sexe',
        'email_temp',
        'telephone_temp',
        'matricule_temp',
        'status',
    ];

    // Relation vers l'user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

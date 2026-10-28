<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Publication;
use App\Models\Commentaire;

class Reaction extends Model
{
    protected $fillable = ['user_id', 'publication_id' , 'commentaire_id' , 'type'];

    protected $casts = [
        'publication_id' => 'integer',
        'commentaire_id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }

    public function commentaire()
    {
        return $this->belongsTo(Commentaire::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Direction extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description', 'admin_id'];
    
    // Optionnel : force le lien si Laravel se perd dans les dossiers
    protected static function newFactory()
    {
        return \Database\Factories\DirectionFactory::new();
    }

    // Récupérer le responsable (admin) de la direction
    public function administrateur(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'admin_id');
    }

    // Une direction contient plusieurs services
    public function services(): HasMany
    {
        return $this->hasOne(Service::class);
    }
}
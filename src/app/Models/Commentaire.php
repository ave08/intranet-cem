<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\User;
use App\Models\Publication;
use App\Models\Reaction;

class Commentaire extends Model
{
    use Notifiable;

    protected $fillable=['contenu','publication_id','auteur_id','parent_id'];

    public function publication()
    {
        return $this->belongsTo(Publication::class,'publication_id');
    }

    public function auteur()
    {
        return $this->belongsTo(User::class,'auteur_id');
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'commentaire_id');
    }

    // Réponses (enfants)
    public function replies()
    {
        return $this->hasMany(Commentaire::class, 'parent_id')
                    ->with('replies'); // récursif
    }

    // Parent
    public function parent()
    {
        return $this->belongsTo(Commentaire::class, 'parent_id');
    }
}

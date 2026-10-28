<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Media;
use App\Models\Commentaire;
use App\Models\Reaction;

class Publication extends Model
{
    use Notifiable;

    protected $fillable=[
        'id','titre','contenu','type','statut','visibilite','date_publication','date_validation','auteur_id'
    ];

    public function getUrlAttribute()
    {
        return Storage::url($this->file_path);
    }

    public function auteur()
    {
        return $this->belongsTo(User::class,'auteur_id');
    }

    public function medias()
    {
        return $this->hasMany(Media::class);
    }

    public function commentaires()
    {
        return $this->hasMany(Commentaire::class,'publication_id')
            ->whereNull('parent_id') // 👈 seulement commentaires principaux
            ->with('replies', 'auteur');
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function likes()
    {
        return $this->reactions()->where('type', 'like');
    }

    public function dislikes()
    {
        return $this->reactions()->where('type', 'dislike');
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Role;
use App\Models\Service;
use App\Models\Publication;
use App\Models\Reaction;
use App\Models\Commentaire;
use App\Models\Tache;
use App\Models\Projet;
use App\Models\HistoriqueAction;
use App\Models\UserSetting;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [ 'name',
        'prenom',
        'date_naissance',
        'sexe',
        'email',
        'telephone',
        'matricule',
        'categorie',
        'fonction',
        'date_embauche',
        'date_debauche',
        'direction_id',
        'service_id',
        'statut',
        'password',
        'must_change_password',
        'email_verified',
        'premiere_connexion_en_attente',
        'email_temp',
        'matricule_temp',
        'photo_profile',
    ];

    protected $hidden = ['password','password_temp'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Laravel gère automatiquement le Hashage
        'date_naissance' => 'date',
        'date_embauche' => 'date',
        'date_debauche' => 'date',
        'must_change_password' => 'boolean',
        'email_verified' => 'boolean',
        'premiere_connexion_en_attente' => 'boolean',
    ];

    protected static function booted()
    {
        static::created(function ($user) {
            $user->settings()->create([
                'email_notifications' => false,
                'push_notifications' => true,
                'mention_notifications' => true,
                'comment_notifications' => true,
                'like_notifications' => true,
                'profile_visibility' => true,
                'show_email' => true,
                'show_phone' => true,
            ]);
        });
    }

    public function getUrlAttribute()
    {
        return Storage::url($this->file_path);
    }

    public function isAdmin()
    {
        return $this->hasRole === 'admin';
    }

    public function isContentManager()
    {
        return $this->role === 'content_manager';
    }

    public function isTaskManager()
    {
        return $this->role === 'task_manager';
    }

    // Relation vers les roles
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'model_has_roles', 'model_id', 'role_id');
    }

    // Vérifie si l'utilisateur a un rôle
    public function hasRole($roleName)
    {
        return $this->roles->pluck('name')->contains($roleName);
    }
    
        // service
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    // chef direct
    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    // subordonnés si c'est un chef
    public function subordinates()
    {
        return $this->hasMany(User::class, 'manager_id');
    }


    public function publications()
    {
        return $this->hasMany(Publication::class,'auteur_id');
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    public function unreadNotifications()
    {
        return $this->notifications()->where('est_lue', false);
    }

    public function projets()
    {
        return $this->hasMany(Projet::class,'responsable_id');
    }

    public function taches()
    {
        return $this->hasMany(Tache::class,'responsable_id');
    }

    public function historiqueActions()
    {
        return $this->hasMany(HistoriqueAction::class);
    }

    public function settings()
    {
        return $this->hasOne(UserSetting::class);
    }
}

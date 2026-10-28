<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable=['name','guard_name'];

    // Relation vers les users via la table pivot
    public function users()
    {
        return $this->belongsToMany(User::class, 'model_has_roles', 'role_id', 'model_id');
    }

    public function hasRole(string $role): bool
    {
        return $this->roles->contains('name', $role);
    }
}

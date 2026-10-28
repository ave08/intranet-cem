<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['libelle','code','parent_id','categorie'];


    public function parent()
    {
        return $this->belongsTo(Service::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Service::class, 'parent_id');
    }

    // users
    public function users()
    {
        return $this->hasMany(User::class);
    }

    // chef du service
    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }
}
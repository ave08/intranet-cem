<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Projet extends Model
{
    use HasFactory;
    protected $fillable=[
        'titre','description','date_debut','date_fin',
        'priorite','direction_id','service_id','responsable_id'
    ];

    public function responsable()
    {
        return $this->belongsTo(User::class,'responsable_id');
    }

    public function taches()
    {
        return $this->hasMany(Tache::class);
    }
}

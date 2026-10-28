<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    use HasFactory;
    
    protected $fillable=[
        'id','titre','description','date_debut','date_echeance',
        'statut','projet_id','responsable_id'
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}

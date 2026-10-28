<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\Publication;

class Media extends Model
{
    protected $table = 'medias';

    protected $fillable = [
        'publication_id',
        'file_path',
        'type'
    ];

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }

    public function getUrlAttribute()
    {
        return Storage::url($this->file_path);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "description",
        "is_private",
        "cover_id",
        "user_id"
    ];
    
    protected $casts = [
        "is_private" => 'bool'
    ];

    public function records() : HasMany
    {
        return $this->hasMany(Record::class);
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cover() : BelongsTo
    {
        return $this->belongsTo(Cover::class);
    }

    public function favorites() : HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function isFavorite() : bool
    {
        return $this->favorites()->where('user_id', Auth::id())->exists();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Record extends Model
{
    use HasFactory;

    protected $fillable = [
        'recorded_at'
    ];

    public function book() : BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function images() : HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function recipes() : HasMany
    {
        return $this->hasMany(Recipe::class);
    }
}

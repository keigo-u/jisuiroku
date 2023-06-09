<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'detail',
        'record_id',
    ];

    public function record() : BelongsTo
    {
        return $this->belongsTo(Record::class);
    }
}

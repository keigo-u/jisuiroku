<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'record_id',
    ];

    public function record() : BelongsTo
    {
        return $this->belongsTo(Record::class);
    }
}

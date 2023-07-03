<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var \App\Models\Book */
        $book = $this->resource;
        assert($book->relationLoaded('user'));

        $created_at = new Carbon($book->created_at);
        $updated_at = new Carbon($book->updated_at);

        return [
            'id' => $book->id,
            'title' => $book->title,
            'description' => $book->description,
            'is_private' => $book->is_private,
            'is_favorite' => $book->isFavorite(),
            'created_at' => $created_at->format('Y/m/d H:i'),
            'updated_at' => $updated_at->format('Y/m/d H:i'),
            'created_by' => $book->user->name,
            'user_icon' => $book->user->icon_path
        ];
    }
}

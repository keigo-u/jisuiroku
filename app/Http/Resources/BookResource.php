<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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

        return [
            'id' => $book->id,
            'title' => $book->title,
            'description' => $book->description,
            'is_private' => $book->is_private,
            'is_favorite' => $book->isFavorite(),
            'created_at' => $book->created_at,
            'updated_at' => $book->updated_at,
            'created_by' => $book->user->name,
            'user_icon' => $book->user->icon_path
        ];
    }
}

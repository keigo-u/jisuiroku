<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class RecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var App\Models\Record */
        $record = $this->resource;
        assert($record->relationLoaded(['recipes', 'images']));

        $recorded_at = new Carbon($record->recorded_at);

        return [
            'id' => $record->id,
            'recorded_at' => $recorded_at->format('Y/m/d'),
            'images' => ImageResource::collection($record->images),
            'recipes' => RecipeResource::collection($record->recipes)
        ];
    }
}

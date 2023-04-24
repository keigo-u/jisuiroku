<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Recipe;
use App\Models\Record;
use App\Models\Image;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class RecordController extends Controller
{
    /**
     * Recordの一覧取得
     *
     * @param Book $book
     * @return Collection
     */
    public function index(Book $book) : Collection
    {
        $records = Record::with(['recipes', 'images'])->where('book_id', $book->id)->get();
        
        return $records;
    }

    /**
     * Recordの登録
     *
     * @param Book $book
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Book $book, Request $request) : JsonResponse
    {
        $data = $request->all();
        $input = json_decode($data['record'], true);
        $record = new Record();
        $record->fill($input)->save();
        
        if (isset($input['recipes'])) {
            foreach ($input['recipes'] as $input_recipe) {
                $recipe = new Recipe();
                $recipe->name = $input_recipe['name'];
                $recipe->detail = $input_recipe['detail'];
                $recipe->record_id = $record->id;
                $recipe->save();
            }
        }

        if (isset($request->images)) {
            foreach ($request->images as $input_image) {
                $image_url = Cloudinary::upload($input_image->getRealPath())->getSecurePath();
                $image = new Image();
                $image->path = $image_url;
                $image->record_id = $record->id;
                $image->save();
            }
        }

        return $record ? response()->json($record, 201) : response()->json([], 500);
    }

    /**
     * Recordの更新
     *
     * @param Book $book
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(Book $book, Request $request, string $id) : JsonResponse
    {
        $record = Record::findOrFail($id);

        return $record->update($request->all()) ? response()->json($record) : response()->json([], 500);
    }

    /**
     * Record削除
     *
     * @param Record $record
     * @return JsonResponse
     */
    public function destroy(Book $book, Record $record) : JsonResponse
    {
        return $record->delete() ? response()->json($record) : response()->json([], 500);
    }
}

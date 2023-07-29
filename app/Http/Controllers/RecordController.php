<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecordRequest;
use App\Http\Resources\RecordResource;
use App\Models\Book;
use App\Models\Recipe;
use App\Models\Record;
use App\Models\Image;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Validator;

class RecordController extends Controller
{
    /**
     * Recordの一覧取得
     *
     * @param Book $book
     * @return Collection
     */
    public function index(Book $book) : AnonymousResourceCollection
    {
        $records = RecordResource::collection(Record::with(['recipes', 'images'])->where('book_id', $book->id)->paginate(1));
        
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
        // バリデーションルールの設定
        $rules = [
            'recorded_at' => 'required',

        ];

        // リクエストからデータを取り出す
        $data = $request->all();
        $input = json_decode($data['record'], true);

        // バリデーションチェック
        Validator::make($input, $rules)->validate();

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
                $image->public_id = Cloudinary::getPublicId();
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
    public function update(Book $book, Record $record, Request $request) : JsonResponse
    {
        // リクエストからデータを取り出す
        $data = $request->all();
        $input = json_decode($data['record'], true);

        if (isset($input['recipes'])) {
            // 一度紐づいているレシピを削除
            $record->recipes()->delete();

            foreach ($input['recipes'] as $input_recipe) {
                $recipe = new Recipe();
                $recipe->name = $input_recipe['name'];
                $recipe->detail = $input_recipe['detail'];
                $recipe->record_id = $record->id;
                $recipe->save();
            }
        }

        if (isset($request->images)) {
            // 一度紐づいている画像を削除
            $record->images()->delete();

            foreach ($request->images as $input_image) {
                $image_url = Cloudinary::upload($input_image->getRealPath())->getSecurePath();
                $image = new Image();
                $image->path = $image_url;
                $image->public_id = Cloudinary::getPublicId();
                $image->record_id = $record->id;
                $image->save();
            }
        }

        return $record->update($input) ? response()->json($record) : response()->json([], 500);
    }

    /**
     * Record削除
     *
     * @param Record $record
     * @return JsonResponse
     */
    public function destroy(Book $book, Record $record) : JsonResponse
    {
        foreach($record->images as $image) {
            $public_id = $image->public_id;
            Cloudinary::destroy($public_id);
        }

        return $record->delete() ? response()->json($record) : response()->json([], 500);
    }
}

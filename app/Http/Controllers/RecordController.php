<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Record;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

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
        $record = new Record();
        $record->fill($request->all());
        $record->book_id = $book->id;
        $record->save();
        
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

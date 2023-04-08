<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Book一覧
     *
     * @return Collection
     */
    public function index() : Collection
    {
        return Book::all();
    }

    /**
     * Bookの詳細(Recordの一覧)
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id)
    {
        $book = Book::with('records')->findOrFail($id);

        return $book;
    }

    /**
     * Bookの登録
     *
     * @param Request $request
     * @param Book $book
     * @return JsonResponse
     */
    public function store(BookRequest $request, Book $book) : JsonResponse
    {
        $book = Book::create($request->all());

        return $book ? response()->json($book, 201) : response()->json([], 500);
    }

    /**
     * Bookの更新
     *
     * @param Request $request
     * @param Book $book
     * @return JsonResponse
     */
    public function update(BookRequest $request, Book $book) : JsonResponse
    {
        return $book->update($request->all()) ? response()->json($book) : response()->json([], 500);
    }

    /**
     * Bookの削除
     *
     * @param Book $book
     * @return void
     */
    public function destroy(Book $book)
    {
        return $book->delete() ? response()->json($book) : response()->json([], 500);
    }
}

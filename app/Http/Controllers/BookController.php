<?php

namespace App\Http\Controllers;

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
     * Bookの登録
     *
     * @param Request $request
     * @param Book $book
     * @return JsonResponse
     */
    public function store(Request $request, Book $book) : JsonResponse
    {
        $book = Book::create($request->all());

        return $book ? response()->json($book, 201) : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book) : JsonResponse
    {
        return $book->update($request->all()) ? response()->json($book) : response()->json([], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

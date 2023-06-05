<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:checkUser,book')->only(['update', 'destroy']);
    }

    /**
     * ユーザーごとのBook一覧
     *
     * @return Collection
     */
    public function index() : Collection
    {
        return Book::where('user_id', Auth::id())->with('user')->get();
    }

    /**
     * ログインしているユーザー以外のすべてのBook一覧
     *
     * @return Collection
     */
    public function all() : Collection
    {
        $books = Book::where([['user_id', '!=', Auth::id()], ['is_private', false]])->with('user')->get();
        $books->map(function ($book){
            $book['is_favorite'] = $book->isFavorite();
            return $book;
        });
        return $books;
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
        $book->fill($request->all());
        $book->user_id = Auth::id();
        $book->save();
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
     * @return JsonResponse
     */
    public function destroy(Book $book) : JsonResponse
    {
        return $book->delete() ? response()->json($book) : response()->json([], 500);
    }
}

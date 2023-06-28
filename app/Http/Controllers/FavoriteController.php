<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $favorites = Favorite::where('user_id', Auth::id())->get();
        $books = collect();
        foreach($favorites as $favorite) {
            $book = $favorite->book()->with('user')->first();
            $books->push($book);
        }

        return BookResource::collection($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $favorite = Favorite::create([
            'book_id' => $request->book_id,
            'user_id' => Auth::id()
        ]);

        return $favorite ? response()->json($favorite, 201) : response()->json([], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $book_id)
    {
        $favorite = Favorite::where([['book_id', $book_id], ['user_id', Auth::id()]])->first();
        $favorite->delete() ? response()->json($favorite) : response()->json([], 500);
    }
}

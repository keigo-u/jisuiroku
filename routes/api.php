<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [LoginController::class, 'register'])->name('register');
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware('auth:sanctum')->group(function() {

    Route::apiResource('/books', BookController::class)->except(['show']);
    Route::get('/books/all', [BookController::class, 'all'])->name('books.all');
    
    Route::prefix('/books/{book}')->controller(RecordController::class)->group(function() {
        Route::get('/', 'index')->name('record.index');
        Route::post('/', 'store')->name('record.store');
        Route::patch('/{record}', 'update')->name('record.update');
        Route::delete('/{record}', 'destroy')->name('record.destroy');
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/favorites', FavoriteController::class)->except(['show', 'update']);
    Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
});

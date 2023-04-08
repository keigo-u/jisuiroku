<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\RecordController;
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
Route::apiResource("/books", BookController::class)->except(['show']);
Route::prefix('/books/{book}')->controller(RecordController::class)->group(function() {
    Route::get('/', 'index')->name('record.index');
    Route::post('/', 'store')->name('record.store');
    Route::patch('/{record}', 'update')->name('record.update');
    Route::delete('/{record}', 'destroy')->name('record.destroy');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<?php

namespace Tests\Feature;

use App\Models\Book;
use Database\Seeders\BookSeeder;
use Database\Seeders\RecordSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     * 
     * @test
     */
    public function 一覧を取得(): void
    {
        $this->seed([
            UserSeeder::class,
            BookSeeder::class,
            RecordSeeder::class
        ]);

        $books = Book::all();

        $response = $this->getJson('api/books');

        $response->assertOk()
            ->assertJsonCount($books->count());
    }
}

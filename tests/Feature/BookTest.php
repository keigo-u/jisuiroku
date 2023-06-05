<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\User;
use Database\Seeders\BookSeeder;
use Database\Seeders\RecordSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();
        $this->actingAs($user);
    }

    /**
     * @test
     */
    public function 一覧を取得することができる(): void
    {
        $this->seed();

        $books = Book::where('user_id', 1)->with('user')->get();
        $response = $this->getJson('api/books');

        $response->assertOk()
            ->assertJsonCount($books->count());
    }

    /**
     * @test
     */
    public function 公開されている一覧を取得することができる(): void
    {
        $this->seed();

        $books = Book::where([['user_id', '!=',1], ['is_private', true]])->with('user')->get();
        $response = $this->getJson('api/books/all');
        
        $response->assertOk()
            ->assertJsonCount($books->count());
    }

    /**
     * @test
     */
    public function 登録することができる(): void
    {
        $this->seed(UserSeeder::class);
        $data = [
            "title" => "テスト",
            "description" => "本追加のテスト",
            "is_private" => false,
            "user_id" => 1
        ];

        $response = $this->postJson('api/books', $data);

        $response->assertCreated()
            ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function タイトルが空の場合は登録できない(): void
    {
        $this->seed(UserSeeder::class);
        $data = [
            "title" => "",
            "description" => "本追加のテスト",
            "is_private" => false,
            "user_id" => 1
        ];

        $response = $this->postJson('api/books', $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは必ず指定してください。'
            ]);
    }

    /**
     * @test
     */
    public function 更新することができる(): void
    {
        $this->seed([
            UserSeeder::class,
            BookSeeder::class,
            RecordSeeder::class
        ]);

        $book = Book::findOrFail(1);

        $book->title = "書き換えテスト";

        $response = $this->patchJson("api/books/{$book->id}", $book->toArray());

        $response->assertOK()
            ->assertJsonFragment($book->toArray());
    }

    /**
     * @test
     */
    public function 削除することができる(): void
    {
        $this->seed([
            UserSeeder::class,
            BookSeeder::class,
            RecordSeeder::class
        ]);
        $book = Book::all();

        $response = $this->deleteJson("api/books/1");

        $response->assertOK();

        $response = $this->getJson('api/books');
        $response->assertJsonCount($book->count() - 1);
    }
}

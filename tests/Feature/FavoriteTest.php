<?php

namespace Tests\Feature;

use App\Models\Favorite;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FavoriteTest extends TestCase
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

        $books = Favorite::with('book')->where('user_id', 1)->get();
        $response = $this->getJson('api/favorites');
        dd($response);
        $response->assertOk()
            ->assertJsonCount($books->count());
    }
}

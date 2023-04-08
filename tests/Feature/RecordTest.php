<?php

namespace Tests\Feature;

use App\Models\Record;
use Database\Seeders\BookSeeder;
use Database\Seeders\RecordSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecordTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function 一覧を取得することができる(): void
    {
        $this->seed([
            UserSeeder::class,
            BookSeeder::class,
            RecordSeeder::class
        ]);

        $response = $this->getJson('api/books/1');

        $response->assertOk();
    }

    /**
     * @test
     */
    public function 登録ができる(): void
    {
        $this->seed([
            UserSeeder::class,
            BookSeeder::class,
            RecordSeeder::class
        ]);

        $data = [
            'recorded_at' => '2023-04-08'
        ];

        $response = $this->postJson('api/books/1', $data);
        dd($response->json());

        $response->assertStatus(200);
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

        $record = Record::findOrFail(1);

        $record->title = "書き換えテスト";

        $response = $this->patchJson("api/books/1/{$record->id}", $record->toArray());

        $response->assertOK()
            ->assertJsonFragment($record->toArray());
    }
}

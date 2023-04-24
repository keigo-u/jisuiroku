<?php

namespace Tests\Feature;

use App\Models\Record;
use Database\Seeders\BookSeeder;
use Database\Seeders\RecordSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;

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
            'recorded_at' => '2023-04-08',
        ];

        $response = $this->postJson('api/books/1', $data);
        dd($response->json());

        $response->assertCreated()
        ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function レシピ込みで登録ができる(): void
    {
        $this->seed([
            UserSeeder::class,
            BookSeeder::class,
            RecordSeeder::class
        ]);

        $recipes = [
            [
                'name' => 'ぶり大根',
                'detail' => '砂糖大さじ1、塩小さじ1/2'
            ],
            [
                'name' => 'チャーハン',
                'detail' => '酒1カップ、みりん大さじ3'
            ],
        ];

        $data = [
            'recorded_at' => '2023-04-08',
            'recipes' => $recipes,
        ];

        $response = $this->postJson('api/books/1', $data);

        $response->assertCreated();
    }

    /**
     * @test
     */
    public function 画像込みで登録ができる(): void
    {
        $this->seed([
            UserSeeder::class,
            BookSeeder::class,
            RecordSeeder::class
        ]);

        $recipes = [
            [
                'name' => 'ぶり大根',
                'detail' => '砂糖大さじ1、塩小さじ1/2'
            ],
            [
                'name' => 'チャーハン',
                'detail' => '酒1カップ、みりん大さじ3'
            ],
        ];

        $image1 = UploadedFile::fake()->image('test1.jpg');
        $image2 = UploadedFile::fake()->image('test2.jpg');
        $images = [$image1, $image2];
        
        $data = [
            'recorded_at' => '2023-04-08',
            'recipes' => $recipes,
            'images' => $images
        ];

        $response = $this->postJson('api/books/1', $data);

        $response->assertCreated();
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

        $records = Record::where('book_id', 1)->get();

        $response = $this->deleteJson("api/books/1/1");
        $response->assertOK();

        $response = $this->getJson('api/books/1');
        $response->assertJsonCount($records->count() - 1);
    }
}

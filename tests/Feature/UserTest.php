<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
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
    public function ユーザー情報を更新できる(): void
    {
        $this->seed();
        $data = [
            'name' => 'testman',
            'email' => 'update@test.com'
        ];
        $response = $this->patchJson('/api/user', $data);
        $response->assertOk();
    }
}

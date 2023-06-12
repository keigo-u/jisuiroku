<?php

namespace Tests\Feature;

use App\Mail\Contacted;
use App\Models\Contact;
use App\Models\User;
use DragonCode\Contracts\Cashier\Config\Payments\Map;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactTest extends TestCase
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
    public function お問い合わせメールが送信できる(): void
    {
        Mail::fake();

        $params = [
            'name' => '山田 太郎',
            'email' => 'test@test.com',
            'body' => 'お問い合わせのテストです。'
        ];

        $resoponse = $this->postJson(route('contacts.store'), $params);
        $resoponse->assertOk();
        Mail::assertSent(Contacted::class, 1); // メールされた回数が合ってる？
    }

    /**
     * @test
     */
    public function 内容の確認(): void
    {
        $params = Contact::create([
            'name' => '山田 太郎',
            'email' => 'test@test.com',
            'body' => 'お問い合わせのテストです。'
        ]);

        $mailable = new Contacted($params);
        $mailable->assertFrom(env('MAIL_FROM_ADDRESS'));

    }

    public function test_image_loading(): void
    {
        dd(asset('/user.png'));
    }
}
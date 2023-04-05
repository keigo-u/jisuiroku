<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('books')->insert([
            [
                "title" => "毎日の自炊",
                "description" => "毎日作った料理を記録するための自炊録",
                "created_at" => new DateTime(),
                "updated_at" => new DateTime(),
                "is_private" => false,
                "cover_id" => null,
                "user_id" => 1,
            ],
            [
                "title" => "お菓子",
                "description" => "お菓子づくりの記録",
                "created_at" => new DateTime(),
                "updated_at" => new DateTime(),
                "is_private" => true,
                "cover_id" => null,
                "user_id" => 1,
            ]
        ]);
    }
}

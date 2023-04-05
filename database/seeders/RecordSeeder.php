<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('records')->insert([
            [
                "book_id" => 1,
                "recorded_at" => "2023-04-01",
                "created_at" => new DateTime(),
                "updated_at" => new DateTime(),
            ],
            [
                "book_id" => 1,
                "recorded_at" => "2023-04-03",
                "created_at" => new DateTime(),
                "updated_at" => new DateTime(),
            ],
            [
                "book_id" => 2,
                "recorded_at" => "2023-04-02",
                "created_at" => new DateTime(),
                "updated_at" => new DateTime(),
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('images')->insert([
            [
                'path' => asset('images/sample1.jpg'),
                'record_id' => 1
            ],
            [
                'path' => asset('images/sample2.jpg'),
                'record_id' => 1
            ]
        ]);
    }
}

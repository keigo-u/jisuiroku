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
                'path' => 'https://res.cloudinary.com/dlqup7j3n/image/upload/v1690647662/sample1.jpg',
                'public_id' => 'sample1',
                'record_id' => 1
            ],
            [
                'path' => 'https://res.cloudinary.com/dlqup7j3n/image/upload/v1690647662/sample2.jpg',
                'public_id' => 'sample2',
                'record_id' => 1
            ]
        ]);
    }
}

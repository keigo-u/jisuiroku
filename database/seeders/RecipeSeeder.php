<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('recipes')->insert([
            [
                'name' => 'カレーライス',
                'detail' => 'じゃがいもと人参をたくさん使う',
                'record_id' => 1
            ],
            [
                'name' => '筍の煮物',
                'detail' => '醤油多め',
                'record_id' => 1
            ],
            [
                'name' => 'わかめと豆腐の味噌汁',
                'detail' => 'わかめは水で戻しておき、沸騰してから豆腐と一緒に加える。',
                'record_id' => 3
            ]
        ]);
    }
}

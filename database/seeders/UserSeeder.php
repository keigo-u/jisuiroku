<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            "name" => "test",
            "email" => "test@test.com",
            "password" => Hash::make("password123"),
            "icon_path" => null,
            "created_at" => new DateTime(),
            "updated_at" => new DateTime()
        ]);
    }
}

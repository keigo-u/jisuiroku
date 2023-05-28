<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Book;

class BookPolicy
{
    /**
     * ユーザーのチェック
     *
     * @param User $user
     * @param Book $book
     * @return boolean
     */
    public function checkUser(User $user, Book $book): bool
    {
        if ($user->id == $book->user_id) {
            return true;
        }
    }
}

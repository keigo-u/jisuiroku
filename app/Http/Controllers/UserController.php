<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserController extends Controller
{
    /**
     * ユーザー情報の取得
     *
     * @param Request $request
     * @return User
     */
    public function index(Request $request): User
    {
        return $request->user();
    }

    /**
     * ユーザー情報の更新
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        return $request->user()->fill($request->all())->save() ? response()->json($request->user()) : response()->json([], 500);
    }

    /**
     * ユーザーアイコンの情報
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updata_icon(Request $request): JsonResponse
    {
        $user = Auth::user();
        if (isset($request->image)) {
            $image_url = Cloudinary::upload($request->image->getRealPath())->getSecurePath();
            $user->icon_path = $image_url;
            $user->save();
        }
        return $user ? response()->json($user) : response()->json([], 500);
    }
}

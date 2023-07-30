<?php

namespace App\Http\Controllers;

use App\Models\IdentifyProvider;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use DragonCode\Contracts\Exceptions\Http\ClientException;
use Illuminate\Support\Facades\Hash;
use Socialite;

class LoginController extends Controller
{
    /**
     * アカウントの作成
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return response()->json(Auth::user());
    }

    /**
     * 認証の試行を処理
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json(Auth::user());
        }

        return response()->json([], 401);
    }

    /**
     * ユーザーをアプリケーションからログアウトさせる
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(true);
    }

    public function redirectToProvider(string $provider)
    {
        $redirectUrl = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
        return $redirectUrl;
    }

    public function handleProviderCallback(string $provider)
    {
        try {
            $provider_user = Socialite::driver($provider)->stateless()->user();
        } catch(ClientException $exception) {
            return response()->json(['erorr' => 'Invalided credentials provided.'], 422);
        }

        $identify_provider = IdentifyProvider::where('provider_user_id', $provider_user->getId())->first();
        if ($identify_provider) {
            Auth::loginUsingId($identify_provider->user_id);
        } else {
            $user = User::firstOrCreate(
                [
                    'email' => $provider_user->getEmail(),
                ],
                [
                    'email_verified_at' => now(),
                    'name' => $provider_user->getName(),
                    'icon_path' => $provider_user->getAvatar(),
                ]
            );

            IdentifyProvider::create([
                'user_id' => $user->id,
                'provider_name' => $provider,
                'provider_user_id' => $provider_user->getId(),
            ]);

            Auth::loginUsingId($user->id);
            return response()->json($user);
        }

        return response()->json($provider_user);
    }
}
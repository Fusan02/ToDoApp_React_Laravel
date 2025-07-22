<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\ {
    Auth,
    Hash
};
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    public function __invoke(Request $request) 
    {
        $data = $request->validate([
            'name'      =>  'required|string|max:255',
            'email'     =>  'required|email|unique:users',
            'password'  =>  ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name'      =>  $data['name'],
            'email'     =>  $data['email'],
            'password'  =>  Hash::make($data['password']),
        ]);

        Auth::login($user);     //自動ログイン
        return response()->json($user, 201);    //Reactへユーザー情報返却
    }
}

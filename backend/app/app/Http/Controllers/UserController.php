<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return $request->user();
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'  => 'sometimes|required|string|max:255',
            'bio'   => 'sometimes|nullable|string|max:1000',
            'avatar'=> 'sometimes|nullable|url',
        ]);

        $user->update($data);
        return response()->json($user);
    }
}
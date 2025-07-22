<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{
    RegisteredUserController,
    AuthenticateUserController,
    LogoutController
};
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| 公開エンドポイント
|--------------------------------------------------------------------------
*/
Route::get('/health', fn () => ['status' => 'ok']);

/*
|--------------------------------------------------------------------------
| 認証系
|--------------------------------------------------------------------------
*/
Route::post('/register',  RegisteredUserController::class);
Route::post('/login',     AuthenticateUserController::class);
Route::post('/logout',    LogoutController::class)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| 認証必須 API
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user',         [UserController::class, 'me']);
    Route::get('/user/profile', [UserController::class, 'update']);
});

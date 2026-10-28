<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AccessRequestController;
use App\Http\Controllers\SetPasswordController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AideController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\CommentController;

Route::get('/test-debug', function() {
    return "Le serveur fonctionne !";
});

Route::middleware(['web'])->group(function () {

    // Premiere connexion
    Route::post('/login/access-request', [AccessRequestController::class, 'store'])->name('login.first');

    Route::get('/pending', function () {
        return Inertia::render('PendingVerificationPage');
    })->name('pending.page');


    // Set password
    Route::get('/set-password', [SetPasswordController::class, 'index'])
        ->name('password.set');

    Route::post('/set-password', [SetPasswordController::class, 'update'])
        ->name('password.update');

    Route::get('/', function () {
        return Auth::check() ? redirect()->route('Home') : redirect()->route('login');
    });

    Route::middleware('guest')->group(function () {
        // Page login
        Route::get('/login', function () {
            return Inertia::render('LoginPage');
        })->name('login');

        // Traitement login
        Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    });

    Route::middleware(['auth','password.changed'])->group(function () {
    
        Route::get('/Home', [HomeController::class, 'index'])->name('Home');
        Route::get('/tasks', [TaskController::class, 'index']);
        Route::post('/publication', [PublicationController::class, 'store']);
        Route::post('/reactions', [ReactionController::class, 'react']);
        Route::post('/publication/{id}/comment', [CommentController::class, 'comment']);
        Route::get('/publication/{id}/comments', [CommentController::class, 'list']);
        Route::get('/publication/{id}/reactions', [ReactionController::class, 'list']);
        Route::post('/content/{id}/approve', [ContentController::class, 'approve']);
        Route::post('/content/{id}/reject', [ContentController::class, 'reject']);
        Route::post('/posts/{id}/react', [ReactionController::class, 'react']);
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::delete('/notifications/{id}', [NotificationController::class, 'delete']);
        Route::get('/aide', [AideController::class, 'index']);
        Route::get('/settings', [SettingController::class, 'settings']);
        Route::get('/profile', [ProfileController::class, 'index']);
        Route::post('/profile/avatar', [SettingController::class, 'updateAvatar']);
        Route::post('/profile/password', [SettingController::class, 'updatePassword']);
        Route::put('/settings/notifications', [SettingController::class, 'updateNotifications']);
        Route::put('/settings/privacy', [SettingController::class, 'updatePrivacy']);
        Route::get('/logout', [AuthController::class, 'logout']);
        
        // ADMIN ONLY
        Route::middleware('role:Administrateur')->group(function () {
            Route::post('/admin/user/{id}/role', [AdminController::class, 'updateRole']);
            Route::delete('/admin/user/{id}', [AdminController::class, 'deleteUser']);
            Route::post('/access-requests/{id}/approve', [AdminController::class, 'approve']);
            Route::post('/access-requests/{id}/reject', [AdminController::class, 'reject']);
            Route::get('/personnels', [AdminController::class, 'index']);
        });

        // CONTENT MANAGER
        Route::middleware('role:Content_manager')->group(function () {
            Route::get('/content', [ContentController::class, 'index'])->name('content');
        });

        // TASK MANAGER
        Route::middleware('role:Task_manager')->group(function () {
            Route::post('/tasks', [TaskController::class, 'store']);
            Route::post('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
        });
    });
});
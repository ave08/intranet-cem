<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Auth\Events\Login;
use App\Events\AvatarUpdated;
use App\Events\PasswordChanged;
use App\Events\SettingsUpdated;
use App\Listeners\LogAvatarUpdated;
use App\Listeners\LogPasswordChanged;
use App\Listeners\LogSettingsUpdated;
use App\Listeners\LogUserLogin;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [

        /* ===== LARAVEL EVENTS ===== */
        Login::class => [
            LogUserLogin::class,
        ],

        /* ===== TES EVENTS ===== */
        AvatarUpdated::class => [
            LogAvatarUpdated::class,
        ],

        PasswordChanged::class => [
            LogPasswordChanged::class,
        ],

        SettingsUpdated::class => [
            LogSettingsUpdated::class,
        ],
    ];

    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }

    public function shouldDiscoverEvents(): bool
    {
        return true; // mets true si tu veux auto-detect les listeners
    }
}

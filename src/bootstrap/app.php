<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Providers;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->trustProxies(at: '*'); 
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        $middleware->alias([
            'password.changed' => \App\Http\Middleware\EnsurePasswordChanged::class,
            'approved' => \App\Http\Middleware\EnsureUserApproved::class,
            'role' => \App\Http\Middleware\CheckRole::class,
            'task.access' => \App\Http\Middleware\CheckRole::class,
        ]);
        
    })

    ->withProviders([
        App\Providers\EventServiceProvider::class,
    ])
    
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })

    ->booted(function () {
       /* if (env('APP_ENV') !== 'local') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }*/
    })
    ->create();

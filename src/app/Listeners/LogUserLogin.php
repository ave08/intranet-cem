<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Auth\Events\Login;
use App\Services\HistoriqueActionService;

class LogUserLogin
{
    protected $service;

    public function __construct(HistoriqueActionService $service)
    {
        $this->service = $service;
    }

    public function handle(Login $event): void
    {
        $this->service->log('login');
    }
}

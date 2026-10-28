<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\HistoriqueActionService;
use App\Events\PasswordChanged;

class LogPasswordChanged
{
    protected $service;

    public function __construct(HistoriqueActionService $service)
    {
        $this->service = $service;
    }

    public function handle(PasswordChanged $event): void
    {
        $this->service->log('password');
    }
}

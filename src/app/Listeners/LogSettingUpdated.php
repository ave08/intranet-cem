<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\HistoriqueActionService;
use App\Events\SettingsUpdated;

class LogSettingUpdated
{
    protected $service;

    public function __construct(HistoriqueActionService $service)
    {
        $this->service = $service;
    }

    public function handle(SettingsUpdated $event): void
    {
        $this->service->log(
            'settings',
            json_encode($event->old),
            json_encode($event->new)
        );
    }
}

<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\HistoriqueActionService;
use App\Events\AvatarUpdated;

class LogAvatarUpdated
{
    protected $service;

    public function __construct(HistoriqueActionService $service)
    {
        $this->service = $service;
    }

    public function handle(AvatarUpdated $event): void
    {
        $this->service->log(
            'profile',
            $event->oldAvatar,
            $event->newAvatar
        );
    }
}

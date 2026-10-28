<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AvatarUpdated
{
    use Dispatchable, SerializesModels;

    public $oldAvatar;
    public $newAvatar;

    public function __construct($oldAvatar, $newAvatar)
    {
        $this->oldAvatar = $oldAvatar;
        $this->newAvatar = $newAvatar;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('users'),
        ];
    }
}

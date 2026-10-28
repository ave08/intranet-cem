<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\UserSetting;

class InitUserSettings extends Command
{
    protected $signature = 'settings:init-users';
    protected $description = 'Create default settings for all users';

    public function handle()
    {
        $users = User::all();

        foreach ($users as $user) {
            UserSetting::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'email_notifications' => false,
                    'push_notifications' => true,
                    'mention_notifications' => true,
                    'comment_notifications' => true,
                    'like_notifications' => true,
                    'profile_visibility' => true,
                    'show_email' => true,
                    'show_phone' => true,
                ]
            );
        }

        $this->info("Settings initialisés pour tous les users !");
    }
}
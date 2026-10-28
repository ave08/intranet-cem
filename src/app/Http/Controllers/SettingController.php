<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\UserSetting;
use App\Events\AvatarUpdated;
use App\Events\PasswordChanged;
use App\Events\SettingsUpdated;

class SettingController extends Controller
{
    public function settings()
    {
        $logs = Auth::user()
            ->historiqueActions()
            ->latest()
            ->limit(20)
            ->get()
            ->map(function ($log) {

                return [
                    'id' => $log->id,

                    // mapping type
                    'type' => match($log->type_action) {
                        'login' => 'login',
                        'password' => 'password',
                        'profile' => 'profile',
                        'settings' => 'settings',
                        'security' => 'security',
                        default => 'security',
                    },

                    // titre
                    'action' => $this->formatAction($log),

                    // description
                    'description' => $this->formatDescription($log),

                    //  date
                    'created_at' => $log->date_action ?? $log->created_at,

                    'device' => $log->device,
                    'location' => $log->location,
                    'ip_address' => $log->ip_address,
                ];
            });

        return Inertia::render('SettingsPage', [
            'activityLogs' => $logs
        ]);
    }

    public function updateAvatar(Request $request)
    {
        $user = auth()->user();
        $oldAvatar = $user->photo_profile ?? '';

        /* ===== VALIDATION ===== */
        $request->validate([
            'photo_profile' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        /* ===== DELETE OLD IMAGE ===== */
        if ($user->photo_profile && Storage::disk('public')->exists($user->photo_profile)) {
            Storage::disk('public')->delete($user->photo_profile);
        }

        /* ===== STORE NEW IMAGE ===== */
        $path = $request->file('photo_profile')->store('avatars', 'public');

        /* ===== SAVE IN DB ===== */
        $user->photo_profile = $path;
        $user->save();

        event(new AvatarUpdated($oldAvatar, $path));
        /* ===== RESPONSE ===== */
        return back()->with('success', 'Photo de profil mise à jour');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|min:8|confirmed'
        ]);

        $user = Auth::user();

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        event(new PasswordChanged($user));

        return back()->with('success' , 'Mot de passe modifié avec succès');
    }

    public function updateSettings(Request $request)
    {
        $user = Auth::user();

        $old = $user->only([
            'email_notifications',
            'push_notifications'
        ]);

        $user->update([
            'email_notifications' => $request->email_notifications,
            'push_notifications' => $request->push_notifications,
        ]);

        $new = $user->only([
            'email_notifications',
            'push_notifications'
        ]);

        event(new SettingsUpdated($old, $new));

        return back();
    }

    public function updateNotifications(Request $request)
    {
        $validated = $request->validate([
            'email_notifications' => 'boolean',
            'push_notifications' => 'boolean',
            'mention_notifications' => 'boolean',
            'comment_notifications' => 'boolean',
            'like_notifications' => 'boolean',
        ]);

        $user = Auth::user();
        $user->settings->update($validated);

        return back()->with('success', 'Notifications mises à jour');
    }

    public function updatePrivacy(Request $request)
    {
        $validated = $request->validate([
            'profile_visibility' => 'boolean',
            'show_email' => 'boolean',
            'show_phone' => 'boolean',
        ]);

        $user = Auth::user();
        $user->settings->update($validated);

        return back()->with('success', 'Paramètres de confidentialité mis à jour');
    }

    private function formatAction($log)
    {
        return match($log->type_action) {
            'login' => 'Connexion réussie',
            'password' => 'Mot de passe modifié',
            'profile' => 'Photo de profil modifiée',
            'settings' => 'Paramètres modifiés',
            'security' => 'Confidentialité modifiés',
            default => 'Action utilisateur',
        };
    }

    private function formatDescription($log)
    {
        if ($log->ancienne_valeur && $log->nouvelle_valeur) {
            return "Modification de {$log->ancienne_valeur} vers {$log->nouvelle_valeur}";
        }

        return match($log->type_action) {
            'login' => 'Connexion à votre compte',
            'password' => 'Vous avez changé votre mot de passe',
            'profile' => 'Mise à jour de votre photo de profil',
            'settings' => 'Mise à jour de vos paramètres',
            'security' => 'Mise à jour de votre confidentialité',
            default => 'Action effectuée sur votre compte',
        };
    }
}

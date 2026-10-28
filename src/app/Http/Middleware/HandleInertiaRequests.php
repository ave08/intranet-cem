<?php
namespace App\Http\Middleware;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Notification;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            'auth' => [
                'user' => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'prenom' => $request->user()->prenom,
                        'email' => $request->user()->email,
                        'phone' => $request->user()->telephone,
                        'photo_profile' => $request->user()->photo_profile,
                        'created_at' => $request->user()->created_at,

                        // système roles[]
                        'roles' => $request->user()->roles->pluck('name')->toArray(),

                        // service
                        'service' => $request->user()->service
                            ? [
                                'id' => $request->user()->service->id,
                                'libelle' => $request->user()->service->libelle,
                            ]
                            : null,
                    ]
                    : null,
            ],

            //  Notifications non lues
            'unreadNotificationsCount' => $request->user()
                ? Notification::where('user_id', $request->user()->id)
                    ->where('est_lue', false)
                    ->count()
                : 0,

            //  Demandes d'accès (ADMIN)
            'pendingAccessRequestsCount' => $request->user()
                ? \App\Models\AccessRequest::where('status', 'pending')->count()
                : 0,

            //  Publications en attente (Content Manager)
            'pendingPostsCount' => $request->user()
                ? \App\Models\Publication::where('statut', 'en_attente')->count()
                : 0,

            // Flash messages (très important)
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],

            // Erreurs validation
            'errors' => fn () => $request->session()->get('errors')
                ? $request->session()->get('errors')->getBag('default')->getMessages()
                : (object) [],
        ];
    }
}

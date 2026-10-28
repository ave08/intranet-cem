<?php
namespace App\Services;

use App\Models\HistoriqueAction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\Http;

class HistoriqueActionService
{
    public function getMeta()
    {
        $ip = request()->ip();

        $agent = new Agent();

        $device = $agent->platform() . ' - ' . $agent->browser();

        $location = Cache::remember("ip_location_{$ip}", now()->addHours(24), function () use ($ip) {

            try {
                $response = Http::timeout(2)->get("http://ip-api.com/json/{$ip}");

                if ($response->successful()) {
                    $data = $response->json();
                    $location = $data['city'] . ', ' . $data['country'];
                }
            } catch (\Exception $e) {
                $location = null;
            }
            return null;
        });

        return [
            'ip_address' => $ip,
            'device' => $device,
            'location' => $location,
        ];
    }

    public function log(
        string $type,
        ?string $ancienneValeur = null,
        ?string $nouvelleValeur = null
    ): void {

        $meta = $this->getMeta();

        HistoriqueAction::create([
            'user_id' => Auth::id(),
            'type_action' => $type,
            'date_action' => now(),
            'ancienne_valeur' => $ancienneValeur 
                ? json_encode($ancienneValeur) 
                : null,

            'nouvelle_valeur' => $nouvelleValeur 
                ? json_encode($nouvelleValeur) 
                : null,
            'ip_address' => $meta['ip_address'],
            'device' => $meta['device'],
            'location' => $meta['location'],
        ]);
    }
}
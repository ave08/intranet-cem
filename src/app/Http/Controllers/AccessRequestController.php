<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\NotificationService;
use App\Models\AccessRequest;
use App\Models\User;

class AccessRequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nom_temp' => 'required|string',
            'prenom_temp' => 'required|string',
            'sexe' => 'required|in:Masculin,Feminin',
            'email_temp' => 'required|email',
            'telephone_temp' => 'required|string',
            'matricule_temp' => 'required|string',
        ]);

        // 🔍 Recherche de l'utilisateur existant
        $user = User::where('matricule', $request->matricule_temp)->first();

        if (!$user) {
        // on renvoie une erreur de validation sur le champ
        return back()->withErrors(['matricule_temp' => "Aucun employé trouvé avec ce matricule"]);
        }

        // ❌ Vérification cohérence (sécurité)
        if ($user->email && $user->email !== $request->email_temp) {
            return back()->withErrors(['message' => "Les informations ne correspondent pas"]);
        }
        
        if($user->must_change_password == 0){
            return redirect()->route('login')->with('error', ' Vous avez déjà reçu une approbation , consultez votre mail');
        }

        // Création de la demande
        if ($user->premiere_connexion_en_attente == 0){
            AccessRequest::create([
                'user_id' => $user->id,
                'nom_temp' => $request->nom_temp,
                'prenom_temp' => $request->prenom_temp,
                'sexe' => $request->sexe,
                'email_temp' => $request->email_temp,
                'telephone_temp' => $request->telephone_temp,
                'matricule_temp' => $request->matricule_temp,
                'status' => 'pending',
            ]);
        

            $admins = User::whereHas('roles', function ($q) {
                $q->where('name', 'Administrateur');
            })->get();

            foreach ($admins as $admin) {

                NotificationService::send(
                    $admin,
                    'accessRequest',
                    "Quelqu'un a envoyé une nouvelle demande d'accès",
                    "/personnels",
                    [
                        'access_request_id' => $user->id,
                    ]
                );
            }

            // Update état user
            $user->premiere_connexion_en_attente = 1;
            $user->save();

            return redirect()->route('login')->with('success', 'Demande envoyée avec succès');
        }
        elseif ($user->premiere_connexion_en_attente == 1) {
            return redirect()->route('login')->with('error' , 'Une demande est déjà en attente');
        }
    }
}

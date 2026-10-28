<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $employees = User::all();

        $accessRequests = AccessRequest::with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('AdminPage', [
            'employees' => $employees,
            'accessRequests' => $accessRequests,

        ]);
    }

    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|string'
        ]);

        $user = User::findOrFail($id);
        $user->roles()->sync([$request->role_id]);
        $user->save();

        return back()->with('success', 'Rôle mis à jour');
    }

    public function deleteUser($id)
    {
        User::findOrFail($id)->delete();

        return back()->with('success', 'Utilisateur supprimé');
    }
    
    public function verify($id)
    {
        $requestAccess = AccessRequest::findOrFail($id);

        $user = User::where('nom', $requestAccess->nom)
            ->where('prenom', $requestAccess->prenom)
            ->where('sexe', $requestAccess->sexe)
            ->where('email', $requestAccess->email)
            ->where('phone', $requestAccess->phone)
            ->first();

        if ($user) {
            $requestAccess->update([
                'status' => 'verified',
                'user_id' => $user->id
            ]);
        } else {
            $requestAccess->update([
                'status' => 'rejected'
            ]);
        }

        return back()->with('success', 'Vérification effectuée');
    }

    
    /**
     * Approbation + envoi password temporaire
     */
    public function approve($id)
    {
        $requestAccess = AccessRequest::findOrFail($id);

        // 1. Récupérer l'utilisateur lié
        $user = User::where('matricule', $requestAccess->matricule_temp)->first();

        if (!$user) {
            return back()->withErrors(['error' => "Utilisateur introuvable pour ce matricule."]);
        }

        // 2. Comparaison des données (Vérification de sécurité)
        if ($user->name !== $requestAccess->nom_temp && $user->prenom !== $requestAccess->prenom_temp) {
            return back()->withErrors(['error' => "Les informations ne correspondent pas aux données employées."]);
        }

        // 3. Générer le mot de passe temporaire
        $tempPassword = Str::random(10);

        // 4. Mise à jour de l'utilisateur
        $user->update([
            'password' => Hash::make($tempPassword),
            'remember_token' => $tempPassword, // Stockage du mot de passe en clair pour vérification ultérieure
            'premiere_connexion_en_attente' => 0      
        ]);

        // 5. Envoi de l'email
        try {
            Mail::raw(
                "Bonjour {$requestAccess->prenom_temp},\n\nVotre demande d'accès a été approuvée.\n\n" .
                "Identifiant : {$user->matricule}\n" .
                "Mot de passe temporaire : {$tempPassword}\n\n" .
                "Connectez-vous pour configurer votre compte définitif.",
                function ($msg) use ($user) {
                    $msg->to($user->email)->subject("Accès Plateforme - Identifiants Temporaires");
                }
            );
        } catch (\Exception $e) {
            // Optionnel : logger l'erreur si le mail échoue mais continuer le processus
        }

        // 6. Suppression de la demande pour qu'elle disparaisse de l'interface Admin
        $requestAccess->delete();

        return back()->with('success', 'Accès approuvé, mail envoyé et demande archivée.');
    }

    public function reject($id)
    {
        $requestAccess = AccessRequest::findOrFail($id);

        // Reset de l'état de l'utilisateur s'il existe
        $user = User::where('matricule', $requestAccess->matricule_temp)->first();
        if ($user) {
            $user->update(['premiere_connexion_en_attente' => 0]);
        }

        // Suppression de la demande pour qu'elle disparaisse de l'interface
        $requestAccess->delete();

        return back()->with('success', 'Demande rejetée et retirée de la liste.');
    }

}

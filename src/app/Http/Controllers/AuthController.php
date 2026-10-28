<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\AccessRequest;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $identifier = trim($request->identifier);

        $user = User::where('email', $request->identifier)
            ->orWhere('matricule', $request->identifier)
            ->first();

        // 2. Erreur si l'utilisateur n'existe pas
        if (!$user) {
            return back()->withErrors(['identifier' => 'Cet identifiant n\'existe pas.']);
        }

        // 3. On vérifie le mot de passe séparément
        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Mot de passe erroné pour cet utilisateur.']);
        }

        Auth::login($user);
        
        $request->session()->regenerate();
        
        // Workflow selon rôle et état
        if ($user->hasRole('Administrateur') || $user->hasRole('Task_manager') || $user->hasRole('Content_manager')) {
            return redirect()->route('Home');
        }

        if ($user->hasRole('Employer')) {
            if ($user->premiere_connexion_en_attente == 1) {
                return back()->with('error', 'Votre compte est en attente de validation.');
            } elseif ($user->must_change_password) {
                    $user->must_change_password = 0;
                    $user->save();
                return redirect()->route('password.set');
            }
        }
        

        return redirect()->route('Home');
    }

    public function logout(Request $request){
        $user = auth()->user();
        Auth::logout($user);
        $request->session()->regenerate();

        return redirect()->route('login');
    }
}
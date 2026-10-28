<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\AccessRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
    
class SetPasswordController extends Controller
{
    public function index()
    {
        return Inertia::render('SetNewPasswordPage');
    }
    
    public function update(Request $request)
    {
        $request->validate([
            'password' => 'required|min:6|confirmed'
        ]);

        $user = auth()->user();

        $user->update([
            'password' => Hash::make($request->password),
            'must_change_password' => 0
        ]);

        Auth::logout();

        return redirect('/login')->with('success', 'Mot de passe modifié. Connectez-vous.');
    }
}
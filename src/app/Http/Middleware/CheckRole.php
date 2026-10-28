<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // On vérifie directement dans la collection chargée (plus sûr que le Query Builder ici)
        $hasAccess = $user->roles->contains(function ($role) use ($roles) {
            return in_array($role->name, $roles);
        });

        if (!$hasAccess) { 
            abort(403, "");
        }

        return $next($request);
    }
}

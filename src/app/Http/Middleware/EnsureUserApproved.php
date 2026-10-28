<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class EnsureUserApproved
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user && $user->premiere_connexion) {
            return redirect('/pending');
        }

        return $next($request);
    }
}
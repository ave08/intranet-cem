<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class EnsurePasswordChanged
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user && $user->must_change_password && !$request->is('set-password*')) {
            return redirect()->route('password.set');
        }

        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('cliente')->check()) {
            return redirect()->intended('/cliente/dashboard');
        }

        if (Auth::guard('operatore')->check()) {
            return redirect()->intended('/operatore/dashboard');
        }

        return $next($request);
    }
}

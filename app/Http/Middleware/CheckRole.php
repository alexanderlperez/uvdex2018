<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
class CheckRole
{
    /**
     * Handle an incoming request.
     * @param $request
     * @param Closure $next
     * @param $role
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|mixed
     */
    public function handle($request, Closure $next,$role)
    {

        $roles = explode('|', $role);
        if(in_array(Auth::user()->role_id, $roles))
            $response = $next($request);
        else
            return redirect(getDashboardUrl());

        return $response;
    }
}

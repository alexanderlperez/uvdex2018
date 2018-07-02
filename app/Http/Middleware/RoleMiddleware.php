<?php

namespace App\Http\Middleware;

use Closure;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $namespaceInfo = explode('\\', $request->route()->getAction()['namespace']);
        $namespace = strtolower($namespaceInfo[count($namespaceInfo) - 1]);
        $role = '';

        if ($request->user()->role_id == \Config::get('constants.role.super_admin'))
            $role = 'super_admin';
        else if ($request->user()->role_id == \Config::get('constants.role.dealer'))
            $role = 'dealer';

        if ($role == $namespace) {
            return $next($request);
        }

        return redirect($role);
    }
}

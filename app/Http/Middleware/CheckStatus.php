<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
class CheckStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        //If the status is not active redirect to login
        if(Auth::check() && Auth::user()->status == \Config::get('constants.status.inactive')){

            $error=__('message.account_inactive_message');

            Auth::logout();
            return redirect('/login')
                ->withErrors(['general'=>$error]);
        }else if(!Auth::guest()){
            return redirect(getDashboardUrl());
        }
        return $response;

    }
}

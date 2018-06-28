<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show admin dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.index');
    }

    /**
     * Change Password
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function changePassword(){

        return view('admin.change_password');
    }

    /**
     * Update Password
     * @param Request $request
     * @return $this
     */
    public function updatePassword(Request $request){

        // Current password doesn't matches
        if (!(Hash::check($request->get('current_password'), Auth::user()->password))) {

            setFlashMessage('danger', trans('message.current_password_mismatch'));
            return redirect()->back();
        }

        //Current password and new password are same
        if(strcmp($request->get('current_password'), $request->get('password')) == 0){

            setFlashMessage('danger', trans('message.same_password'));
            return redirect()->back();
        }

        $this->_validate($request);

        try {

            DB::beginTransaction();

            $user = User::find(Auth::user()->id);
            $user_data = array('password'=>Hash::make($request->get('password')));
            $user->update($user_data);

            DB::commit();
            setFlashMessage('success', trans('message.password_change_success'));
        } catch (\Exception $e) {

            DB::rollBack();
            setFlashMessage('danger', $e->getMessage());
            return back()->withInput($request->all());
        }

        return back();
    }


    /**
     * _validate
     * @param $request
     */
    protected function _validate($request){

        $rules = array(
            'current_password'=>'required|between:3,40',
            'password'=>'required|between:3,40|confirmed',
            'password_confirmation'=>'required|same:password|between:3,40',
        );

        $this->validate($request, $rules);
    }

    /**
     * Profile
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function profile(){

        return view('admin.profile');
    }

    /**
     * Update Profile
     * @param Request $request
     * @return $this
     */
    public function updateProfile(Request $request){

        $rules = array(
            'firstname'=>'required|string',
            'lastname'=>'required|string',
            'email'=>'required|email|unique:users,email,'.Auth::user()->id,
        );

        $this->validate($request, $rules);

        try {

            DB::beginTransaction();

            $user = User::find(Auth::user()->id);
            $user->update($request->all());

            DB::commit();
            setFlashMessage('success', trans('message.profile_success'));
        } catch (\Exception $e) {

            DB::rollBack();
            setFlashMessage('danger', $e->getMessage());
            return back()->withInput($request->all());
        }

        return back();
    }

}

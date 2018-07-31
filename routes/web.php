<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');
Route::get('home', 'UserController@index')->name('home');
Route::get('allVehicles', 'HomeController@allVehicles')->name('allVehicles');

Route::group(['middleware' => ['auth', 'role:'.config('constants.role.super_admin').'|'.config('constants.role.dealer')]], function () {

    Route::get('changePassword', 'UserController@changePassword')->name('changePassword');
    Route::post('updatePassword', 'UserController@updatePassword')->name('updatePassword');
    Route::get('profile', 'UserController@profile')->name('profile');
    Route::post('updateProfile', 'UserController@updateProfile')->name('updateProfile');
});

Auth::routes();

//Includes all routes from folder
foreach (glob(dirname(__FILE__) . "/web/*.php") as $filename) {
    include $filename;
}
<?php
Route::group(array('namespace' => 'Dealer', 'middleware' => ['auth', 'role:'.config('constants.role.super_admin').'|'.config('constants.role.dealer')]), function () {

    Route::resource('vehicles', 'VehicleController');
    Route::get('getVehicles', 'VehicleController@getData')->name('getVehicles');
});
<?php
Route::group(array('namespace' => 'Dealer', 'middleware' => ['auth', 'role:'.config('constants.role.super_admin').'|'.config('constants.role.dealer')]), function () {

    Route::resource('vehicles', 'VehicleController');
    Route::get('new-vehicles', 'VehicleController@newVehicles')->name('new-vehicles');
    Route::get('used-vehicles', 'VehicleController@usedVehicles')->name('used-vehicles');
    Route::get('sold-vehicles', 'VehicleController@soldVehicles')->name('sold-vehicles');
    Route::get('export/{type}', 'VehicleController@export')->name('export');
    Route::get('getData/{type}', 'VehicleController@getData')->name('getData');
    Route::post('saveVehicle', 'VehicleController@saveVehicle')->name('saveVehicle');
    Route::post('uploadImage', 'VehicleController@uploadImage')->name('uploadImage');
    Route::post('deleteImage', 'VehicleController@deleteImage')->name('deleteImage');
    Route::post('updateFeaturedImage', 'VehicleController@updateFeaturedImage')->name('updateFeaturedImage');
    Route::get('exportCarForSale', 'VehicleController@exportCarForSale')->name('exportCarForSale');
});
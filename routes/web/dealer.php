<?php
Route::group(array('namespace' => 'Dealer', 'middleware' => ['auth', 'role:'.config('constants.role.dealer')]), function () {

    Route::get('dealer', 'HomeController@index')->name('dealer');
});
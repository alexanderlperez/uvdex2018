<?php
Route::group(array('namespace' => 'Admin', 'middleware' => ['auth', 'role:'.config('constants.role.super_admin')]), function () {

    Route::get('admin', 'HomeController@index')->name('admin');
});
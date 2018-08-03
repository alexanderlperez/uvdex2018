<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('welcome');
    }

    public function allVehicles() {

        $vehicles = Vehicle::select('id', 'type', 'stock_number', 'model_year', 'make', 'trim', 'mileage', 'exterior_color', 'passengers', 'msrp', 'price', 'nada', 'rebate_price', 'description', 'vin', 'images')
                            ->orderByRaw("FIELD(type , 'N', 'U') ASC")
                            ->orderBy('model_year', 'desc')
                            ->get();

        $vehicles->transform(function ($item){

            $item->featured = null;
            if(!empty($item->images)) {

                $item->featured = explode(',', $item->images)[0];
                $item->images = explode(',', $item->images);
            }

            return $item;
        });

        return response()->json(['vehicles' => $vehicles]);
    }
}

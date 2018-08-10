<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

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

    /**
     * getVehicles
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVehicles($id=0) {

        if($id)
            $vehicles = Vehicle::select('id', 'type', 'stock_number', DB::raw("CONCAT_WS(' ',model_year, make, model, trim ) as title"), 'body_type', 'mileage', 'exterior_color', 'passengers', 'msrp', 'price', 'nada', 'description', 'vin', 'images')
                ->whereId($id)
                ->get();
        else
            $vehicles = Vehicle::select('id', 'type', 'body_type', DB::raw("CONCAT_WS(' ',model_year, make, model, trim ) as title"), 'mileage', 'exterior_color', 'passengers', 'msrp', 'price', 'nada', 'description', 'vin', 'images')
                                ->orderByRaw("FIELD(type , 'N', 'U') ASC")
                                ->orderBy('model_year', 'desc')
                                ->get();

        $vehicles->transform(function ($item){

            $item->featured = NULL;
            if ( ! empty($item->images)) {

                $item->featured = explode(',', $item->images)[0];
                $item->images = explode(',', $item->images);
            }

            $their_price = 0;
            $our_price = 0;

            if ($item->type == 'N') {

                $item->type = 'New';

                if ($item->price < $item->msrp)
                    $their_price = $item->msrp;

                $our_price = $item->price;

            } else if ($item->type == 'U') {

                $item->type = 'Used';

                if ($item->price < $item->nada)
                    $their_price = $item->nada;

                $our_price = $item->price;
            }

            $item->their_price = '$'.number_format((double)$their_price, 0);
            $item->our_price = '$'.number_format((double)$our_price, 0);

            $item->show_price = TRUE;
            if ( $item->their_price == 0 || ($item->their_price < $item->our_price) )
                $item->show_price = FALSE;

            return $item;
        });

        if ($id)
            return response()->json(['vehicle' => $vehicles[0]]);
        else {
            $minPrice = $vehicles->min('price');
            if ($minPrice > 0)
                $minPrice = floor($minPrice / 1000);

            $maxPrice = $vehicles->max('price');
            if ($maxPrice > 0)
                $maxPrice = ceil($maxPrice / 1000);

            return response()->json(['vehicles' => $vehicles, 'min' => $minPrice, 'max' => $maxPrice]);
        }
    }
}

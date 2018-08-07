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

        $vehicles = Vehicle::select('id', 'type', 'stock_number', 'body_type', 'model_year', 'make', 'model', 'trim', 'mileage', 'exterior_color', 'passengers', 'msrp', 'price', 'nada', 'description', 'vin', 'images')
                            ->orderByRaw("FIELD(type , 'N', 'U') ASC")
                            ->orderBy('model_year', 'desc')
                            ->get();

        $vehicles->transform(function ($item){

            $item->featured = NULL;
            if ( ! empty($item->images)) {

                $item->featured = explode(',', $item->images)[0];
                $item->images = explode(',', $item->images);
            }

            // Fetch actual price
            $item->price = (int) preg_replace("/[^0-9]/", "", $item->price);
            $nada = (int) preg_replace("/[^0-9]/", "", $item->nada);
            $msrp = (int) preg_replace("/[^0-9]/", "", $item->msrp);

            $item->their_price = 0;
            $item->our_price = 0;

            if ($item->type == 'N') {

                $item->type = 'New';

                if ($item->price < $msrp)
                    $item->their_price = $msrp;

                $item->our_price = $item->price;

            } else if ($item->type == 'U') {

                $item->type = 'Used';

                if ($item->price < $nada)
                    $item->their_price = $nada;

                $item->our_price = $item->price;
            }

            $item->filtered_their_price = '$'.number_format((double)$item->their_price, 0);
            $item->filtered_our_price = '$'.number_format((double)$item->our_price, 0);

            $item->show_price = TRUE;
            if ( $item->filtered_their_price == 0 || ($item->filtered_their_price < $item->filtered_our_price) )
                $item->show_price = FALSE;

            return $item;
        });

        //$vehicles['min'] = $vehicles->min('price');
        //$vehicles['max'] = $vehicles->max('price');

        return response()->json(['vehicles' => $vehicles]);
    }
}

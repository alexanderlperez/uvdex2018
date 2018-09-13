<?php

namespace App\Http\Controllers\Dealer;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Config;

use Box\Spout\Reader\ReaderFactory;
use Box\Spout\Writer\WriterFactory;
use Box\Spout\Common\Type;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{
    public $successStatus = 200;
    private $title = 'Inventory';

    public function __construct()
    {
    }

    /**
     * Display listing of new vehicles.
     *
     * @return \Illuminate\Http\Response
     */
    public function newVehicles()
    {
        return view('dealer.vehicles.new');
    }

    /**
     * Display listing of used vehicles.
     *
     * @return \Illuminate\Http\Response
     */
    public function usedVehicles()
    {
        return view('dealer.vehicles.used');
    }

    /**
     * Display listing of sold vehicles.
     *
     * @return \Illuminate\Http\Response
     */
    public function soldVehicles()
    {
        return view('dealer.vehicles.sold');
    }

    /**
     * Get Vehicle Data
     * @param $type
     * @return mixed
     * @throws \Exception
     */
    public function getData($type){

        if($type == 'S') // Sold vehicles
            $vehicles = Vehicle::whereUserId(getUserId())
                            ->whereIsActive(Config::get('constants.status.inactive'))
                            ->exclude(['user_id', 'body_style', 'created_at', 'updated_at'])
                            ->orderByRaw("FIELD(body_type , 'car', 'suv', 'truck', '') ASC")
                            ->orderBy('model_year', 'desc')
                            ->orderBy('model')
                            ->get();
        else
            $vehicles = Vehicle::whereUserId(getUserId())
                            ->whereIsActive(Config::get('constants.status.active'))
                            ->whereType($type)
                            ->exclude(['user_id', 'body_style', 'created_at', 'updated_at'])
                            ->orderByRaw("FIELD(body_type , 'car', 'suv', 'truck', '') ASC")
                            ->orderBy('model_year', 'desc')
                            ->orderBy('model')
                            ->get();

        $vehicles->transform(function ($item, $key){

            $item->featured = '';
            $item->images_count = 0;
            if(!empty($item->images)){
                $item->featured = explode(',', $item->images)[0];
                $item->images_count = count(explode(',', $item->images));
                $item->images = explode(',', $item->images);
            }

            if($item->is_active)
                $item->is_active = 'Available';
            else
                $item->is_active = 'Sold';

            $item->body_type = strtoupper($item->body_type);
            $item->key = $key+1;
            return $item;
        });

        return response()->json(['vehicles' => $vehicles], $this->successStatus);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('dealer.vehicles.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->_validate($request);

        try {

            DB::beginTransaction();
            $this->_save($request);
            DB::commit();
            setFlashMessage('success', trans('message.add_success', ['name' => $this->title]));
            return back();
        } catch (\Exception $e) {

            DB::rollBack();
            setFlashMessage('danger', $e->getMessage());
            return back()->withInput($request->all());
        }
    }

    /**
     * Save Vehicle the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveVehicle(Request $request)
    {
        // Filter values for null
        $data = filterNullValues($request->get('updated'));
        $default['option_text'] = $default['description'] = $default['images'] = '';
        $data = array_merge($default, $data);

        if(isset($data['body_type']))
            $data['body_type'] = strtolower($data['body_type']);

        try {

            DB::beginTransaction();
            $data['user_id'] = getUserId();

            if(isset($data['is_active'])) {

                if($data['is_active'] == 'Sold')
                    $data['is_active'] = Config::get('constants.status.inactive');
                else
                    $data['is_active'] = Config::get('constants.status.active');
            }

            $vehicle = Vehicle::create($data);
            DB::commit();

            $message['type'] = 'Success';
            $message['status'] = trans('message.add_success', ['name' => $this->title]);
            $message['id'] = $vehicle->id;

            return response()->json(['message' => $message], $this->successStatus);
        } catch (\Exception $e) {

            DB::rollBack();
            $message['type'] = 'Error';
            $message['status'] = $e->getMessage();
            return response()->json(['message' => $message], $this->successStatus);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Filter values for null
        $data = filterNullValues($request->get('updated'));

        if(isset($data['body_type']))
            $data['body_type'] = strtolower($data['body_type']);

        if(isset($data['is_active'])) {

            if($data['is_active'] == 'Sold')
                $data['is_active'] = Config::get('constants.status.inactive');
            else
                $data['is_active'] = Config::get('constants.status.active');
        }

        try {

            DB::beginTransaction();
            $this->_update($data, $id);
            DB::commit();

            $message['type'] = 'Success';
            $message['status'] = trans('message.update_success', ['name' => $this->title]);

            return response()->json(['message' => $message], $this->successStatus);
        } catch (\Exception $e) {

            DB::rollBack();
            $message['type'] = 'Error';
            $message['status'] = $e->getMessage();
            return response()->json(['message' => $message], $this->successStatus);
        }
    }

    /**
     * Delete Image
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteImage(Request $request)
    {
        $id = $request->get('id');
        $image = $request->get('image');

        $message['type'] = 'Error';
        $message['status'] = trans('message.image_fail');

        if (!empty($image)){

            try{

                DB::beginTransaction();

                $vehicle = Vehicle::find($id);
                $images = explode(',', $vehicle->images);

                $key = array_search($image,$images);
                unset($images[$key]);

                $data['images'] = implode(',',$images);

                $vehicle->update($data);
                DB::commit();

                $message['type'] = 'Success';
                $message['images'] = $data['images'];
                $message['status'] = trans('message.delete_success', ['name' => $this->title]);
            } catch (\Exception $e) {

                DB::rollBack();

                $message['type'] = 'Error';
                $message['status'] = $e->getMessage();
            }
        }

        return response()->json(['message' => $message], $this->successStatus);
    }

    /**
     * _validate
     * @param $request
     */
    protected function _validate($request){

        $rules = ['file' =>  'required|mimes:csv,txt'];
        $this->validate($request, $rules);
    }

    /**
     * _save
     * @param $input
     * @throws \Box\Spout\Common\Exception\IOException
     * @throws \Box\Spout\Common\Exception\UnsupportedTypeException
     * @throws \Box\Spout\Reader\Exception\ReaderNotOpenedException
     */
    protected function _save($input) {

        $reader = ReaderFactory::create(Type::CSV); // for CSV files

        // This would be used for the payload
        $filePath = $input->file->getPathName();
        $reader->open($filePath);
        $data = [];

        foreach ($reader->getSheetIterator() as $sheet) {
            foreach ($sheet->getRowIterator() as $key => $row) {

                if($key == 1) // Skipping header
                    continue;

                // Set import variables
                $data[$key]['user_id'] = getUserId();
                $data[$key]['vin'] = $row[0];
                $data[$key]['type'] = $row[1];
                $data[$key]['stock_number'] = $row[2];
                $data[$key]['make'] = $row[3];
                $data[$key]['model'] = $row[4];
                $data[$key]['model_year'] = $row[5];
                $data[$key]['trim'] = $row[6];
                $data[$key]['body_style'] = $row[7];

                $data[$key]['body_type'] = '';
                if(!empty($row[7]) && (in_array(strtolower($row[7]), Config::get('constants.body_type.car'))))
                    $data[$key]['body_type'] = 'car';

                if(!empty($row[7]) && (in_array(strtolower($row[7]), Config::get('constants.body_type.suv'))))
                    $data[$key]['body_type'] = 'suv';

                if(!empty($row[7]) && (in_array(strtolower($row[7]), Config::get('constants.body_type.truck'))))
                    $data[$key]['body_type'] = 'truck';

                $data[$key]['mileage'] = '';
                if(!empty($row[8]))
                    $data[$key]['mileage'] = number_format((double)$row[8], 0);

                $data[$key]['engine_description'] = $row[9];
                $data[$key]['cylinders'] = $row[10];
                $data[$key]['fuel_type'] = $row[11];
                $data[$key]['transmission'] = $row[12];
                $data[$key]['price'] = $row[13];
                $data[$key]['exterior_color'] = $row[14];
                $data[$key]['interior_color'] = $row[15];

                $data[$key]['option_text'] = '';
                if(!empty($row[16]))
                    $data[$key]['option_text'] = $row[16];

                $data[$key]['description'] = '';
                if(!empty($row[17]))
                    $data[$key]['description'] = $row[17];

                $data[$key]['images'] = '';
                if(!empty($row[18]))
                    $data[$key]['images'] = $row[18];
            }
        }

        $reader->close();

        if(!empty($data)) {
            Vehicle::whereUserId(getUserId())->delete();
            Vehicle::insert($data);
        }

    }

    /**
     * _update
     * @param $data
     * @param $id
     */
    public function _update($data, $id)
    {
        $vehicle = Vehicle::find($id);
        $vehicle->update($data);
    }

    /**
     * export
     * @param $type
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Box\Spout\Common\Exception\IOException
     * @throws \Box\Spout\Common\Exception\InvalidArgumentException
     * @throws \Box\Spout\Common\Exception\UnsupportedTypeException
     * @throws \Box\Spout\Writer\Exception\WriterNotOpenedException
     */
    public function export($type) {

        $headers[] = [];
        $vehicles = '';
        if($type == 'U') {
            $headers[] = Config::get('constants.headers.used');
            $vehicles = Vehicle::select('stock_number', DB::raw("CONCAT('$', FORMAT(price, 0)) as price"), DB::raw("CONCAT('$', FORMAT(nada, 0)) as nada"), 'model_year', 'make', 'model', 'cpo', 'exterior_color', 'trim', 'mileage', 'engine_description', 'vin', 'description', 'previous_owner', 'images', 'passengers')
                                ->whereUserId(getUserId())
                                ->whereIsActive(Config::get('constants.status.active'))
                                ->whereType($type)
                                ->orderByRaw("FIELD(body_type , 'car', 'suv', 'truck', '') ASC")
                                ->orderBy('model_year', 'desc')
                                ->get()->toArray();
        }else if($type == 'N') {
            $headers[] = Config::get('constants.headers.new');
            $vehicles = Vehicle::select('stock_number', 'scheduled', 'sold', 'model_year', DB::raw("CONCAT('$', FORMAT(msrp, 0)) as msrp"), DB::raw("CONCAT('$', FORMAT(price, 0)) as price"), 'make', 'model', 'trim', 'exterior_color', 'vin', 'description', 'images', 'passengers')
                                ->whereUserId(getUserId())
                                ->whereIsActive(Config::get('constants.status.active'))
                                ->whereType($type)
                                ->orderByRaw("FIELD(body_type , 'car', 'suv', 'truck', '') ASC")
                                ->orderBy('model_year', 'desc')
                                ->get()->toArray();
        }

        if(!empty($vehicles)) {

            $rows = array_merge($headers, $vehicles);

            $writer = WriterFactory::create(Type::XLSX); // for XLSX files
            $filename = 'inventory.xlsx';
            $path = storage_path('app/'.$filename);
            $writer->openToBrowser($path); // stream data directly to the browser

            $writer->addRows($rows);
            $writer->close();
        } else {

            setFlashMessage('error', trans('message.no_vehicle'));
            return back();
        }

    }

    /**
     * uploadImage
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(Request $request) {

        try {
            $imageName = saveFile($request, 'file', Config::get('constants.inventory.prefix'), Config::get('constants.inventory.folder'));
            $data = ['images' => url('/').Storage::url('inventory/'.$imageName)];

            if(!empty($request->get('id')) && !is_null($request->get('id'))){

                $update = $data;
                $vehicle = Vehicle::findOrFail($request->get('id'));

                //Append to existing string if present
                if(!empty($vehicle->images))
                    $update['images'] = $vehicle->images.','.$data['images'];

                $vehicle->update($update);

                $message['type'] = 'Success';
                $message['images'] = $update['images'];
                $message['status'] = trans('message.image_success');
            } else {

                $data['user_id'] = getUserId();
                $data['option_text'] = '';
                $data['description'] = '';
                $data['type'] = $request->get('type');
                $vehicle = Vehicle::create($data);

                $message['id'] = $vehicle->id;
                $message['images'] = $data['images'];
                $message['type'] = 'Success';
                $message['status'] = trans('message.image_success');
            }

            return response()->json(['message' => $message], $this->successStatus);
        } catch (\Exception $e) {

            DB::rollBack();
            $message['type'] = 'Error';
            $message['status'] = $e->getMessage();
            return response()->json(['message' => $message], $this->successStatus);
        }

    }

    /**
     * exportCarForSale
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Box\Spout\Common\Exception\IOException
     * @throws \Box\Spout\Common\Exception\InvalidArgumentException
     * @throws \Box\Spout\Common\Exception\UnsupportedTypeException
     * @throws \Box\Spout\Writer\Exception\WriterNotOpenedException
     */
    public function exportCarForSale(){

        $headers[] = Config::get('constants.headers.carforsale');
        $vehicles = Vehicle::select('type', 'vin', 'stock_number', 'make', 'model', 'model_year', 'trim', 'body_style', 'mileage', 'engine_description', 'cylinders', 'fuel_type', 'transmission', 'price', 'exterior_color', 'interior_color', 'option_text','description', 'images')
            ->whereUserId(getUserId())
            ->where('price', '!=', 0)
            ->whereIsActive(Config::get('constants.status.active')) // Unsold
            ->orderByRaw("FIELD(body_type , 'car', 'suv', 'truck', '') ASC")
            ->orderBy('model_year', 'desc')
            ->get()->toArray();

        $data = [];
        foreach ($vehicles as $key => $vehicle) {

            $data[$key]['CarsForSaleDealerID'] = "1004599";
            $data[$key] += $vehicle;
            $data[$key]['price'] = (string)($vehicle['price']);
            $data[$key]['mileage'] = str_replace(',', '',$vehicle['mileage']);

            /*$cylinders = substr($vehicle['cylinders'], -1);

            $data[$key]['cylinders'] = "0";
            if(!empty($cylinders))
                $data[$key]['cylinders'] = $cylinders;*/
        }

        if(!empty($data)) {

            $writer = WriterFactory::create(Type::CSV); // for CSV files
            $filename = 'inventory.txt';
            $path = storage_path('app/'.$filename);
            $writer->openToBrowser($path); // stream data directly to the browser

            $writer->addRows($data);
            $writer->close();
        } else {

            setFlashMessage('error', trans('message.no_vehicle'));
            return back();
        }
    }
}

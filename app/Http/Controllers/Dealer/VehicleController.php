<?php

namespace App\Http\Controllers\Dealer;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
use Config;

use Box\Spout\Reader\ReaderFactory;
use Box\Spout\Writer\WriterFactory;
use Box\Spout\Common\Type;

class VehicleController extends Controller
{
    public $successStatus = 200;
    private $title = 'Vehicle';

    public function __construct()
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('dealer.vehicles.index');
    }

    /**
     * Get Vehicle Data
     * @param $id
     * @return mixed
     * @throws \Exception
     */
    public function getData($id){

        $vehicles = Vehicle::whereUserId($id)->exclude(['user_id', 'created_at', 'updated_at'])->get();

        $vehicles->transform(function ($item, $key){

            if(!empty($item->images))
                $item->images = explode(',', $item->images);

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
        } catch (\Exception $e) {

            DB::rollBack();
            setFlashMessage('danger', $e->getMessage());
            return back()->withInput($request->all());
        }

        return redirect()->route('vehicles.index');
    }

    /**
     * Save Vehicle the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveVehicle(Request $request)
    {
        $data = $request->get('updated');

        try {

            DB::beginTransaction();
            $data['user_id'] = Auth::user()->id;
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
        $data = $request->get('updated');

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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            DB::beginTransaction();

            $vehicle = Vehicle::find($id);
            $vehicle->delete();

            // Delete image
            if(!empty($vehicle->image))
                deleteFile(Config::get('constants.vehicle.folder'), $vehicle->image);

            DB::commit();
            setFlashMessage('success', trans('message.delete_success', ['name' => $this->title]));
        } catch (\Exception $e) {

            DB::rollBack();
            setFlashMessage('danger', $e->getMessage());
        }

        return back();
    }

    /**
     * Change Vehicle Status
     * @param $id
     * @param $value
     * @return \Illuminate\Http\RedirectResponse
     */
    public function changeStatus($id, $value) {

        $data = getStatus($value);

        try {

            DB::beginTransaction();

            $vehicle = Vehicle::findOrFail($id);
            $vehicle->update($data);

            DB::commit();

            if($data['is_active'])
                setFlashMessage('success', trans('message.status_active', ['name' => $this->title]));
            else
                setFlashMessage('success', trans('message.status_inactive', ['name' => $this->title]));
        } catch (\Exception $e) {

            DB::rollBack();
            setFlashMessage('danger', trans('message.status_fail', ['name' => $this->title]));
        }

        return back();
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

                $data[$key]['user_id'] = Auth::user()->id;
                $data[$key]['vin'] = $row[0];

                $type = '';
                if ($row[1] == 'U')
                    $type = 'Used';
                elseif ($row[1] == 'N')
                    $type = 'New';

                $data[$key]['type'] = $type;
                $data[$key]['stock_number'] = $row[2];
                $data[$key]['make'] = $row[3];
                $data[$key]['model'] = $row[4];
                $data[$key]['model_year'] = $row[5];
                $data[$key]['trim'] = $row[6];
                $data[$key]['body_style'] = $row[7];
                $data[$key]['mileage'] = $row[8];
                $data[$key]['engine_description'] = $row[9];
                $data[$key]['cylinders'] = $row[10];
                $data[$key]['fuel_type'] = $row[11];
                $data[$key]['transmission'] = $row[12];
                $data[$key]['price'] = $row[13];
                $data[$key]['exterior_color'] = $row[14];
                $data[$key]['interior_color'] = $row[15];
                $data[$key]['option_text'] = $row[16];
                $data[$key]['description'] = $row[17];
                $data[$key]['images'] = $row[18];
            }
        }

        $reader->close();

        if(!empty($data)) {
            Vehicle::whereUserId(Auth::user()->id)->delete();
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
     * Export vehicle inventory
     */
    public function export() {

        $vehicles =  Vehicle::whereUserId(Auth::user()->id)->exclude(['id', 'user_id', 'created_at', 'updated_at'])->get()->toArray();

        if(!empty($vehicles)) {

            $headers[] = Config::get('constants.headers');
            $rows = $headers + $vehicles;

            $writer = WriterFactory::create(Type::CSV); // for CSV files
            $filename = 'inventory.csv';
            $path = storage_path('app/'.$filename);
            $writer->openToBrowser($path); // stream data directly to the browser

            $writer->addRows($rows);
            $writer->close();
        } else {

            setFlashMessage('error', trans('message.no_vehicle'));
            return back();
        }

    }
}

@extends('adminlte::page')
@section('title_prefix', 'Vehicle')
@section('heading','Manage Vehicle')

@section('action')
    <a href='{{ route('vehicles.create') }}' class='btn btn-primary'>Import Vehicle</a>
@stop

@section('content')
    <div class="row">
        <div class="col-sm-12">
            <div class="box">
                <div class="box-body">
                    {!! showFlashMessage() !!}
                    <table class="display responsive nowrap" id="vehicle-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                    </table>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div>
    </div>
@stop
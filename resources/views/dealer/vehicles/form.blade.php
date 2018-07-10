@extends('adminlte::page')
@section('title_prefix',ucfirst($title))
@section('action')
    <a href='{{ route('vehicles.index') }}' class='btn btn-primary'>Go Back</a>
@stop

@section('content')

    <div class="box box-primary">

        @section('heading','Import Vehicles')
        {!!Form::open(['url' => 'vehicles','class'=>'form-horizontal', 'enctype'=>'multipart/form-data'])!!}

            <div class="box-body">

                {!! showFlashMessage() !!}
                @include('layouts.error_flash')

                <div class="form-group">
                    {!! Form::label('file','File',['class'=>'control-label col-sm-2'])!!}
                    <div class="col-sm-10">
                        {!! Form::file('file',['class'=>'form-control'])!!}
                    </div>
                </div>
            </div>

            <div class="box-footer">
                {!! Form::submit('Import Vehicles',['class'=>'btn btn-primary  pull-right'])!!}
            </div>

        {!! form::close()!!}
    </div>

@stop
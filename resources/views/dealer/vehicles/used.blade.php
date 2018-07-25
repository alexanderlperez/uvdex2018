@extends('adminlte::page')
@section('title_prefix', 'Vehicle')
@section('heading','Used Vehicles')

@section('action')
    <a href='{{ route('export') }}' class='btn btn-primary'>Export Inventory</a>
@stop

@section('content')
    <div class="row">
        <div class="col-sm-12">
            <div class="box">
                <div class="box-body">
                    {!! showFlashMessage() !!}
                    <div id="inline_grid"></div>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div>
    </div>

    <script>
        var user_id = '{{Auth::user()->id}}';
        var action = window.location.pathname.split("/")[1];
    </script>
    <script src="{{asset('js/admin.js')}}"></script>

@stop
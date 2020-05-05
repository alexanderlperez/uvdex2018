@extends('adminlte::page')
@section('title_prefix','Change Password')
@section('heading','Change Password')

@section('content')

    <div class="box box-primary">

        {!!Form::open(['url' => 'updatePassword', 'role'=>'form'])!!}

        <div class="box-body">

            {!! showFlashMessage() !!}
            @include('layouts.error_flash')

            <div class="form-group">
                {!! Form::label('current_password','Current Password')!!}

                {!! Form::password('current_password',['class'=>'form-control', 'placeholder'=>'Enter Current Password', 'maxlength' => '60'])!!}
            </div>
            <div class="form-group">
                {!! Form::label('password','New Password')!!}

                {!! Form::password('password',['class'=>'form-control', 'placeholder'=>'Enter New Password', 'maxlength' => '60'])!!}
            </div>
            <div class="form-group">
                {!! Form::label('password_confirmation','Confirm Password')!!}

                {!! Form::password('password_confirmation',['class'=>'form-control', 'placeholder'=>'Confirm New Password', 'maxlength' => '60'])!!}
            </div>

        </div>


        <div class="box-footer">
            {!! Form::submit('Change Password',['class'=>'btn btn-primary'])!!}
        </div>


        {!! form::close()!!}
    </div>
@stop
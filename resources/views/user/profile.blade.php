@extends('adminlte::page')
@section('title_prefix','Profile')
@section('heading','Profile')

@section('content')

    <div class="box box-primary">

        {!!Form::open(['url' => 'updateProfile', 'role'=>'form'])!!}

        <div class="box-body">

            {!! showFlashMessage() !!}
            @include('layouts.error_flash')

            <div class="form-group">
                {!! Form::label('firstname','First Name')!!}

                {!! Form::text('first_name', $user->first_name,['class'=>'form-control', 'placeholder'=>'Enter First Name', 'maxlength' => '50'])!!}
            </div>
            <div class="form-group">
                {!! Form::label('lastname','Last Name')!!}

                {!! Form::text('last_name', $user->last_name,['class'=>'form-control', 'placeholder'=>'Enter Last Name', 'maxlength' => '50'])!!}
            </div>
            <div class="form-group">
                {!! Form::label('email','Email')!!}

                {!! Form::email('email', $user->email,['class'=>'form-control', 'placeholder'=>'Enter Email', 'maxlength' => '100'])!!}
            </div>

        </div>


        <div class="box-footer">
            {!! Form::submit('Update Profile',['class'=>'btn btn-primary'])!!}
        </div>


        {!! form::close()!!}
    </div>
@stop
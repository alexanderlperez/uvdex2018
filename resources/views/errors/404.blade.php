@extends('layouts.app')
@section('title','Page Not Found')
@section('content')

    <div class="container">
      <div class="row text-center">
        <div class="col-md-12">
          <div class="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div class="error-details"><h4>Sorry, an error has occured, Requested page not found!</h4></div>
            <div class="error-actions">
              <a href="{{url('/')}}" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"> </span> Take Me Home </a>
            </div>
          </div>
        </div>
      </div>
    </div>

@endsection
@extends('layouts.app')
@section('title','Home')

@section('content')

@if(browserIE()) 
	<h4 class="text-warning text-center">Internet Explorer Web Browser Is Not Supported.</h4> 
	<a href="https://www.carsforsale.com/used-car-dealer/rost-motor-inc-manson-ia-d654382/Inventory" class="text-center btn-info">Go To Car for Sale</a>
	@php die(); @endphp
@endif


        <div class="flex-center position-ref full-height">
            <div class="main-wrapper">
                <div id="root">

                </div>
            </div>
        </div>
@endsection

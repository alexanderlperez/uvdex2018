@if($errors->any())
    <div class="alert alert-danger col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        @foreach($errors->all() as $error)
            <p>{{ $error }}</p>
        @endforeach
    </div>
@endif
<div class="modal fade" id="delete" role="dialog">
  <div class="modal-dialog">
    {!!Form::open(['url' => '', 'id' => 'deleteModal'])!!}
    {{ method_field('DELETE') }}
    <!-- Modal content-->
      <div class="modal-content">
        <input type="hidden" id="id" name="id" value="">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i></button>
          <h4 class="modal-title">Delete Record</h4>
        </div>
        <div class="modal-body">
          <p>Do you wish to delete this record?</p>
        </div>
        <div class="modal-footer">
          <a href="javascript:void(0)" class="btn btn-primary pull-left" data-dismiss="modal">Cancel</a>
          <button type="submit" class="btn btn-primary" >Delete</button>
        </div>
      </div>
    {!! Form::close() !!}
  </div>
</div>

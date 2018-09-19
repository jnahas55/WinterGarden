<template>

<!-- Modal -->
<div class="modal fade" id="roofModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Roof configuration</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        
    <form>
        
      <label class="col-sm-2 col-form-label"><strong>Open</strong></label>
      <hr>      
      
      <div class="control-group">
            <div class="controls form-inline">
                <div class="col-md-2">
                    <label for="startBetween">Between</label>
                </div>
                
                <div class="col-md-3">
                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker1"/>
                    <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                    </div>
                    </div>
                    </div>
                </div>
                    
                <div class="col-md-2">
                    <label for="startBetween">and</label>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker2" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker2"/>
                    <div class="input-group-append" data-target="#datetimepicker2" data-toggle="datetimepicker">
                    </div>
                    </div>
                    </div>
                </div>

          </div>
      </div>
      
<br>

      <div class="form-group row">
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="ignoreOpenIfRain" :checked="ignoreOpenIfRain" @click="updateIgnoreOpenIfRain()">
            <label class="form-check-label" for="ignoreOpenIfRain">
              Ignore in case of rain
            </label>
          </div>
        </div>
      </div>
    
    
      
      <label class="col-sm-2 col-form-label"><strong>Close</strong></label>
      <hr>      
   
      <div class="control-group">
            <div class="controls form-inline">
                <div class="col-md-2">
                    <label for="startBetween">Between</label>
                </div>
                
                <div class="col-md-3">
                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker3" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker3"/>
                    <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
                    <!--div class="input-group-text"><i class="far fa-clock"></i></div-->
                    </div>
                    </div>
                    </div>
                </div>
                    
                <div class="col-md-2">
                    <label for="startBetween">and</label>
                </div>
                
                <div class="col-md-3">
                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker4" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker4"/>
                    <div class="input-group-append" data-target="#datetimepicker4" data-toggle="datetimepicker">
                    <!--div class="input-group-text"><i class="far fa-clock"></i></div-->
                    </div>
                    </div>
                    </div>
                </div>

          </div>
      </div>
      <br>

      <div class="form-group row">
        <div class="col-md-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="closeWhenRain" :checked="closeWhenRain" @click="updateCloseWhenRain()">
            <label class="form-check-label" for="closeWhenRain">
              Close automaticallly in case of rain
            </label>
          </div>
        </div>
      </div>
      

    </form>
    
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>




</template>

<script>

export default{

    mounted(){
        $(function () {
            $('#datetimepicker1').datetimepicker({
                format: 'LT'
            });
            $('#datetimepicker2').datetimepicker({
                format: 'LT'
            });
            $('#datetimepicker3').datetimepicker({
                format: 'LT'
            });
            $('#datetimepicker4').datetimepicker({
                format: 'LT'
            });
        });
    },
    data: function () {
        return {
          closeWhenRain: false,
          ignoreOpenIfRain: false,    
        }
    },
    methods:{
    
        updateCloseWhenRain: function(){
            this.closeWhenRain = !this.closeWhenRain;
        },
        updateIgnoreOpenIfRain: function(){
            this.ignoreOpenIfRain = !this.ignoreOpenIfRain;
        }
    
    }
}


</script>


<style scoped>

input {
    border-top:0;
    border-left:0;
    border-right:0;
}

</style>
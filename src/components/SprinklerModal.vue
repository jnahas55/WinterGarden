<template>

<!-- Modal -->
<div class="modal fade" id="sprinklerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Sprinkler configuration</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


    <form>

      <label class="col-sm-2 col-form-label"><strong>Start</strong></label>
      <hr>

      <div class="control-group">
            <div class="controls form-inline">
                <label for="startBetween">Between</label>


                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
                    <input type="text" class="form-control"  v-model="sprinklerOpenStartHour"/>
                    <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                    </div>
                    </div>
                    </div>

                    <label for="startBetween"> and... </label>

                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker2" data-target-input="nearest">
                    <input type="text" class="form-control"  v-model="sprinklerOpenFinishHour"/>
                    <div class="input-group-append" data-target="#datetimepicker2" data-toggle="datetimepicker">
                    </div>
                    </div>
                    </div>

          </div>
      </div>

<br>

      <div class="form-group row">
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="verifyHumidityToStart" :checked="verifyHumidityToStart" @click="updateVerifyHumidityToStart()">
            <label class="form-check-label" for="verifyHumidityToStart">
              Verify Humidity To Open It
            </label>
          </div>
        </div>
      </div>



     <div v-if="verifyHumidityToStart" class="form-group row">
         <div class="col-md-4">
            <label for="humidityValue">If humidity is less than (%)</label>
        </div>
        <div class="col-md-2">
              <input type="text" class="form-control" id="humidityValue" placeholder="value" v-model="highestHumidityValue">
        </div>
      </div>


      <!--label class="col-sm-2 col-form-label"><strong>Stop</strong></label>
      <hr>

      <div class="control-group">
            <div class="controls form-inline">
                <div class="col-md-2">
                    <label for="startBetween">Between</label>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker3" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker3" v-model="sprinklerCloseStartHour"/>
                    <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
                    </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-2">
                    <label for="startBetween"> and... </label>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                    <div class="input-group date" id="datetimepicker4" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker4" v-model="sprinklerCloseFinishHour"/>
                    <div class="input-group-append" data-target="#datetimepicker4" data-toggle="datetimepicker">
                    </div>
                    </div>
                    </div>
                </div>

          </div>
      </div-->
      <br>

      <div class="form-group row">
        <div class="col-md-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="verifyHumidityToStop" :checked="verifyHumidityToStop" @click="updateVerifyHumidityToStop()">
            <label class="form-check-label" for="verifyHumidityToStop">
              Verify Humidity To Close It
            </label>
          </div>
        </div>
      </div>

     <div v-if="verifyHumidityToStop" class="form-group row">
         <div class="col-md-4">
            <label for="humidityValue">If humidity is greater than (%)</label>
        </div>
        <div class="col-md-2">
              <input type="text" class="form-control" id="inputHumidity" placeholder="value" v-model="lowestHumidityValue">
        </div>
      </div>

    </form>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="addTriggersForSprinkler()" data-dismiss="modal">Save changes</button>
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
          verifyHumidityToStart: false,
          verifyHumidityToStop: false,
        }
    },
    methods:{

        updateVerifyHumidityToStop: function(){
            this.verifyHumidityToStop = !this.verifyHumidityToStop;
        },
        updateVerifyHumidityToStart: function(){
            this.verifyHumidityToStart = !this.verifyHumidityToStart;
        },
        addTriggersForSprinkler: function(){
          this.$store.dispatch('addTriggersForSprinkler');
        }
    },
    computed:{

      sprinklerOpenStartHour: {
        // getter
        get: function () {
          return this.$store.state.sprinklerOpenStartHour;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setSprinklerOpenStartHour', newValue);
        }
      },


      sprinklerOpenFinishHour: {
        // getter
        get: function () {
          return this.$store.state.sprinklerOpenFinishHour;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setSprinklerOpenFinishHour', newValue);
        }
      },


      highestHumidityValue: {
        // getter
        get: function () {
          return this.$store.state.highestHumidityValue;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setHighestHumidityValue', newValue);
        }
      },


      lowestHumidityValue: {
        // getter
        get: function () {
          return this.$store.state.lowestHumidityValue;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setLowestHumidityValue', newValue);
        }
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

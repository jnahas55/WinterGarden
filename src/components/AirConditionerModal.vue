<template>

<!-- Modal -->

<div class="modal fade" id="airConditionerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Air Conditioner configuration</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


    <form>


      <div class="form-group row">
        <div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="ignoreOpenIfRain" v-model="isTemperatureSet" :checked="ignoreOpenIfRain" @click="updateIgnoreOpenIfRain()">
            <label class="form-check-label" for="ignoreOpenIfRain">
              Ensure temperature won't exceed
            </label>
          </div>
        </div>

        <div class="col-md-2 text-center">
              <input type="text" v-model="temperatureValue" class="form-control" id="from" placeholder="18">
        </div>

      </div>

    </form>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="addTriggersForAirConditioner" data-dismiss="modal">Save changes</button>
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

    computed:{

      isTemperatureSet: {
        // getter
        get: function () {
          return this.$store.state.isTemperatureSet;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setIsTemperatureSet', newValue);
        }
      },

      temperatureValue: {
        // getter
        get: function () {
          return this.$store.state.temperatureValue;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setTemperatureValue', newValue);
        }
      },
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
        },
        addTriggersForAirConditioner: function(){
            this.$store.dispatch('addTriggersForAirConditioner');
        }
    },

}


</script>


<style scoped>

input {
    border-top:0;
    border-left:0;
    border-right:0;
}

</style>

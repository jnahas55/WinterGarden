<template>

    <div class="dashboard" style="padding-top: 6%; padding-left: 9%; padding-right: 9%">

    <div class="row text-center h-100">

    <div class="col-md-4" >

                        <div class="card shadow clickable-card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-6">
                                <img src="../../../temperature.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-6">
                                <br>
                                <h2 class="card-title text-primary">{{this.$store.state.temperature}}°C</h2>
                                <div class="text-muted">Temperature</div>
                              </div>
                            </div>
                          </div>
                         </div>

                         <div class="card shadow clickable-card" style="margin-top: 7%; margin-bottom: 7%;">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-6">
                                <img src="../../../humidity.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-6">
                                <br>
                                <h2 class="card-title text-primary">{{this.$store.state.humidity}}%</h2>
                                <div class="text-muted">Humidity</div>
                              </div>
                            </div>
                          </div>
                         </div>


                         <div class="card shadow clickable-card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-6">
                                <img src="../../../rain.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-6">
                                 <br>
                                 <h2 class="card-title text-primary">{{this.$store.state.rain}}</h2>
                                <div class="text-muted">Rain</div>
                              </div>
                            </div>
                          </div>
                         </div>

    </div>


    <div class="col-md-8">


                        <div class="card shadow clickable-card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-3">
                                <img src="../../../openable_roof.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-7">
                                 <br>
                                 <h1 class="card-title text-primary">{{this.$store.state.roofSensor}}</h1>
                                <h3 class="text-muted">Garden Roof</h3>
                              </div>
                              <div class="col-md-2">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#roofModal">
                                    <i class="fas fa-cogs" style="float:right;"/>
                                </button>
                              </div>
                            </div>
                          </div>
                         </div>

                         <div class="card shadow clickable-card" style="margin-top: 2%; margin-bottom: 2%;">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-3">
                                <img src="../../../air-condition-system.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-7">
                              <br>
                                <h1 class="card-title text-primary">{{this.$store.state.airConditionerSensor}}</h1>
                                <h3 class="text-muted">Air Conditioner</h3>
                              </div>
                              <div class="col-md-2">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#airConditionerModal">
                                    <i class="fas fa-cogs" style="float:right;"/>
                                </button>
                              </div>
                            </div>
                          </div>
                         </div>


                         <div class="card shadow clickable-card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-3">
                                <img src="../../../sprinkler.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-7">
                                <br>
                                 <h1 class="card-title text-primary">{{this.$store.state.sprinklerSensor}}</h1>
                                 <h3 class="text-muted">Sprinkler</h3>
                              </div>
                              <div class="col-md-2">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#sprinklerModal">
                                    <i class="fas fa-cogs" style="float:right;"/>
                                </button>
                              </div>
                            </div>
                          </div>
                         </div>


    </div>

    </div> <!-- Close row -->


    </div> <!-- Close container -->

</template>

<script>

    export default {

      mounted(){
         console.log("ENTERING MOUNTED!!!");
         this.$store.dispatch('addNecessaryDataStreams');
         this.$store.dispatch('addNecessaryActions');
	       this.$store.dispatch('lalala');
      },


    }


</script>

<style scoped>

i{
    cursor: pointer;
}

.card{
   background-color: rgba(245, 245, 245, 0.8);
}


</style>

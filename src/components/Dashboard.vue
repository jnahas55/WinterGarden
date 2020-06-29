<template>

    <div class="dashboard" style="padding-top: 6%; padding-left: 9%; padding-right: 9%; padding-bottom: 6%;">

    <div class="row">

    <div class="col-md-5" >

                         <div class="card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-6">
                                <img src="../assets/rain2.png" alt="Responsive image" class="img-fluid" style="width:117px;height:117px">
                              </div>
                              <div class="col-md-6">
				 <div v-if="this.$store.state.rain === '' || this.$store.state.rain === 'N/A'">
	                            <h2 class="card-title text-primary text-center">Unknown</h2>
				 </div>
				 <div v-else>
                                    <h2 v-if="this.$store.state.rain === 1" class="card-title text-primary">Yes</h2>
				    <h2 v-else class="card-title text-primary">No</h2>
				 </div>
                                <h3 class="text-muted">Rain</h3>
                              </div>
                            </div>
                          </div>
                         </div>

<br>

                        <div class="card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-6">
                                <img src="../assets/temp-transp2.png" alt="Responsive image" class="img-fluid" style="width:117px;height:117px">
                              </div>
                              <div class="col-md-6">
                                <h2 v-if="this.$store.state.temperature === '' || this.$store.state.temperature === 'N/A'" class="card-title text-primary">Unknown</h2>
				<h2 v-else class="card-title text-primary">{{this.$store.state.temperature}}°C</h2>
                                <h3 class="text-muted">Temperature</h3>
                              </div>
                            </div>
                          </div>
                         </div>

<br>

                         <div class="card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-6">
                                <img src="../assets/humid-transp2.png" alt="Responsive image" class="img-fluid" style="width:117px;height:130px">
                              </div>
                              <div class="col-md-6">
                                <h2 v-if="this.$store.state.humidity === '' || this.$store.state.humidity === 'N/A'" class="card-title text-primary">Unknown</h2>
                                <h2 v-else class="card-title text-primary">{{this.$store.state.humidity*100}}%</h2>
                                <h3 class="text-muted">Humidity</h3>
                              </div>
                            </div>
                          </div>
                         </div>


    </div>   <!-- CLOSE   HUMIDITY--TEMP--RAIN   COLUMN -->


    <div class="col-md-7">


                        <div class="card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-3">
                                <img src="../assets/openable_roof2.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-7">
                                 <br>
				 <div v-if="this.$store.state.roofSensor === '' || this.$store.state.roofSensor === 'N/A'">
	                            <h2 class="card-title text-primary">Unknown</h2>
				 </div>
				 <div v-else>
                                    <h2 v-if="this.$store.state.roofSensor === 1" class="card-title text-primary">Closed</h2>
				    <h2 v-else class="card-title text-primary">Open</h2>
				 </div>
                                <h4 class="text-muted">Garden Roof</h4>
                              </div>
                              <div class="col-md-2">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#roofModal">
                                    <i class="fas fa-pen" style="float:right;"/>
                                </button>
                              </div>
                            </div>
                          </div>
                         </div>
<br>
                         <div class="card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-3">
                                <img src="../assets/air-condition-system2.png" alt="Responsive image" class="img-fluid">
                              </div>
                              <div class="col-md-7">
                              <br>
				 <div v-if="this.$store.state.airConditionerSensor === '' || this.$store.state.airConditionerSensor === 'N/A'">
	                            <h2 class="card-title text-primary">Unknown</h2>
				 </div>
				 <div v-else>
                                    <h2 v-if="this.$store.state.airConditionerSensor === 1" class="card-title text-primary">On</h2>
				    <h2 v-else class="card-title text-primary">Off</h2>
				 </div>
                                <h3 class="text-muted">Air Conditioner</h3>
                              </div>
                              <div class="col-md-2">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#airConditionerModal">
                                    <i class="fas fa-pen" style="float:right;"/>
                                </button>
                              </div>
                            </div>
                          </div>
                         </div>
<br>
                         <div class="card shadow clickable-card">
                          <div class="card-body text-center">
                            <div class="row">
                              <div class="col-md-3">
                                <img src="../assets/sprinkler2.png" alt="Responsive image" class="img-fluid" style="width:130px;height:130px">
                              </div>
                              <div class="col-md-7">
                                <br>
				 <div v-if="this.$store.state.sprinklerSensor === '' || this.$store.state.sprinklerSensor === 'N/A'">
	                            <h2 class="card-title text-primary">Unknown</h2>
				 </div>
				 <div v-else>
                                    <h2 v-if="this.$store.state.sprinklerSensor === 1" class="card-title text-primary">On</h2>
				    <h2 v-else class="card-title text-primary">Off</h2>
				 </div>
                                 <h3 class="text-muted">Sprinkler</h3>
                              </div>
                              <div class="col-md-2">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#sprinklerModal">
                                    <i class="fas fa-pen" style="float:right;"/>
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
	 this.$store.dispatch('fetchDataStreamsState');
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

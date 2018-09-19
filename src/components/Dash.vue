<template>
    <div class="dashboard">    
    
     <div class="row d-flex align-items-stretch" style="font-family: sans-serif;">
        <div class="col-md-6" style="font-family: sans-serif; ">

                    <div class="card shadow clickable-card" >
                      <div class="card-body text-center">
                        <div class="row">
                          <div class="col-md-6">               
                            <img src="../../../temperature.png" alt="Responsive image" class="img-fluid">
                          </div>
                          <div class="col-md-6">
                             <h3 class="card-title text-primary">23°C</h3>
                            <div class="text-muted">Temperature</div>
                          </div>
                        </div>
                      </div>
                     </div>
        </div>
        
        <div class="col-md-6" style="font-family: sans-serif;">

                    <div class="card shadow clickable-card" >
                      <div class="card-body text-center">
                        <div class="row">
                        
                          <!--div class="col-md-6">               
                            <img src="../../../temperature.png" alt="Responsive image" class="img-fluid">
                          </div>
                          <div class="col-md-6">
                             <h3 class="card-title text-primary">23°C</h3>
                            <div class="text-muted">Temperature P2</div>
                          </div-->
                          
                          
                            <div class="col-md-6">               
                                <img src="../../../humidity.png" alt="Responsive image" class="img-fluid">
                            </div>
                            <div class="col-md-6">
                                <h3 class="card-title text-primary">78%</h3>
                                <div class="text-muted">Humidity</div>
                            </div>
                          
                          
                        </div>
                      </div>
                     </div>
        </div>
        
        <div class="col-md-3" style="font-family: sans-serif;">

                    <div class="card shadow clickable-card" >
                      <div class="card-body text-center">
                        <div class="row">
                          <!--div class="col-md-6">               
                            <img src="../../../humidity.png" alt="Responsive image" class="img-fluid">
                          </div>
                          <div class="col-md-6">
                            <h3 class="card-title text-primary">56%</h3>
                            <div class="text-muted">Humidity P1</div>
                          </div-->
                          
                          
                            <div class="col-md-6">               
                                <!--img src="../../../open_roof.jpg" alt="Responsive image" class="img-fluid"-->
                                <img src="../../../openable_roof.png" alt="Responsive image" class="img-fluid">
                                
                            </div>
                            <div class="col-md-6">
                                <h3 class="card-title text-primary">Open</h3>
                                <div class="text-muted">Roof</div>
                            </div>
                          
                          
                          
                        </div>
                      </div>
                     </div>
            
        </div>
        
        
        <div class="col-md-3" style="font-family: sans-serif;">
        
                    <div class="card shadow clickable-card" >
                      <div class="card-body text-center">
                        <div class="row">
                          <!--div class="col-md-6">               
                            <img src="../../../humidity.png" alt="Responsive image" class="img-fluid">
                          </div>
                          <div class="col-md-6">
                            <h3 class="card-title text-primary">78%</h3>
                            <div class="text-muted">Humidity P2</div>
                          </div-->
                          
                          
                          <div class="col-md-6">               
                            <img src="../../../sprinkler.png" alt="Responsive image" class="img-fluid">
                          </div>
                          <div class="col-md-6">
                            <h3 class="card-title text-primary">Open</h3>
                            <div class="text-muted">Sprinkler</div>
                          </div>
                          
                          
                          
                          
                        </div>
                      </div>
                     </div>
        </div>
        
        
    </div>   
    
    

    </div> <!-- Close container -->
</template>

<script>

    export default {
  
    }


</script>

<style scoped>
 .dashboard{
    margin-top: 5.5%;
 }

</style>
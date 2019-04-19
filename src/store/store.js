import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';
import Chart from 'chart.js';


Vue.use(Vuex); // tell Vue you want to use Vuex plugin

export const store = new Vuex.Store({
  strict: false,

  state:{

//##########################################################################################
// Backend details
//##########################################################################################

    backendEndPoint: "http://localhost:8090",
    dataStreamsResponseFromBackend: {},
    dataStreams:[],

    humidity: undefined,
    rain: undefined,
    temperature: undefined,
    roofSensor: undefined,
    airConditionerSensor: undefined,
    sprinklerSensor: undefined,


    trigger: undefined,
    action: undefined,
    command: undefined,
    dataStreams : ["RainSensor", "RoofSensor", "SprinklerSensor", "AirConditionerSensor", "HumiditySensor","TemperatureSensor"],

    actions: [
      {
        name:"StartUpAirConditioner",
        http_request:{
            request_line:
              {url:"http://localhost:8090/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Start Up Air Conditioner",
              priority:"30"
            }
        }
      },

      {
        name:"ShutdownAirConditioner",
        http_request:{
            request_line:
              {url:"http://localhost:8090/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Shutdown Air Conditioner",
              priority:"29"
            }
        }
      },

      {
        name:"OpenSprinkler",
        http_request:{
            request_line:
              {url:"http://localhost:8090/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Open Sprinkler",
              priority:"30"
            }
        }
      },
      {
        name:"CloseSprinkler",
        http_request:{
            request_line:
              {url:"http://localhost:8090/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Close Sprinkler",
              priority:"29"
            }
        }
      },

      {
        name:"OpenRoof",
        http_request:{
            request_line:
              {url:"http://localhost:8090/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Open Roof",
              priority:"30"
            }
        }
      },

      {
          name:"CloseRoof",
          request_line:
            {url:"http://localhost:8090/commands",
            method:"POST",
            version:"HTTP/1.1"
          },
          headers:[],
          body:{
            command:"Close Roof",
            priority:"29"
          }
      }
    ]

  },

  mutations: {

    processTriggerForRoofOpenning: (state, startHour, finishHour, ignoreIfRain) => {

      let conditionStartHour = startHour + ":00:00";
      let conditionFinishHour = finishHour + ":00:00";
      let triggerConditions = [];

      triggerConditions.push({
        type:"time_interval",
        from: conditionStartHour,
        to: conditionFinishHour
      });

      if(ignoreIfRain){
        triggerConditions.push({
          type:"data_stream_current_value",
          data_stream:"RainSensor",
          condition:{operator:"=",value:0}  // if it's not raining
        });
      }

      state.trigger = {
        name:"OpenRoofBetweenHoursIfNotRaining",
        action:"OpenRoof",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: triggerConditions
      };

    },


    processTriggerForRoofClosing: (state, startHour, finishHour, closeIfRain) => {

      let triggerConditions = [];
      let triggerName = "CloseRoofBetweenHours";

      if(startHour===undefined && finishHour===undefined){

        triggerName = "CloseRoofOnlyIfRaining";
        triggerConditions.push({
          type:"data_stream_current_value",
          data_stream:"RainSensor",
          condition:{operator:"=",value:1}  // if it's not raining
        });

      }else{
        let conditionStartHour = startHour + ":00:00";
        let conditionFinishHour = finishHour + ":00:00";

        triggerConditions.push({
          type:"time_interval",
          from: conditionStartHour,
          to: conditionFinishHour
        });
      }

      state.trigger = {
        name: triggerName,
        action:"CloseRoof",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: triggerConditions
      };
    },


    processTriggerForAirConditioner: (state, temperature) => {

      state.trigger = {
        name:"StartUpAirConditionerWhenTemperatureAboveCertainValue",
        action:"StartUpAirConditioner",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: [
              {
                type:"data_stream_current_value",
                data_stream:"TemperatureSensor",
                condition:{operator:">",value:23}
              },

              {
                type:"data_stream_current_value",
                data_stream:"AirConditionerSensor",
                condition:{operator:"=",value:0} // if it's off
              }
        ]
      };

    },


    processTriggerForAirConditionerWhenTemperatureIsBelow: (state, temperature) => {

      state.trigger = {
        name:"ShutdownAirConditionerWhenTemperatureBelowCertainValue",
        action:"ShutdownAirConditioner",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: [
              {
                type:"data_stream_current_value",
                data_stream:"TemperatureSensor",
                condition:{operator:"<",value:23}
              },

              {
                type:"data_stream_current_value",
                data_stream:"AirConditionerSensor",
                condition:{operator:"=",value:1} // if it's off
              }
        ]
      };

    },


    processTriggerForSprinklerClosing: (state, startHour, finishHour, humidityValue) => {

      let conditionStartHour = startHour + ":00:00";
      let conditionFinishHour = finishHour + ":00:00";
      let triggerConditions = [];

      triggerConditions.push({
        type:"time_interval",
        from: conditionStartHour,
        to: conditionFinishHour
      });

      if(ignoreIfRain){
        triggerConditions.push({
          type:"data_stream_current_value",
          data_stream:"HumiditySensor",
          condition:{operator:">",value:humidityValue}  // if it's beyond X humidity value
        });
      }

      state.trigger = {
        name:"CloseWinterGardenSpinkler",
        action:"CloseSprinkler",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: triggerConditions
      };

    },


    processTriggerForSprinklerOpenning: (state, startHour, finishHour, humidityValue) => {

      let conditionStartHour = startHour + ":00:00";
      let conditionFinishHour = finishHour + ":00:00";
      let triggerConditions = [];

      triggerConditions.push({
        type:"time_interval",
        from: conditionStartHour,
        to: conditionFinishHour
      });

      if(ignoreIfRain){
        triggerConditions.push({
          type:"data_stream_current_value",
          data_stream:"HumiditySensor",
          condition:{operator:"<",value:humidityValue}  // if it's below X humidity value
        });
      }

      state.trigger = {
        name:"OpenWinterGardenSpinkler",
        action:"OpenSprinkler",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: triggerConditions
      };

    },


    processActionForSprinklerOpenning: (state, startHour, finishHour, humidityValue) => {
    // No es agregar un comando cada vez, es sumarlo a la cola.
    // Fran de su lado matchea string contra string. Va a haber N repeticiones de Abrir Aspersor en la cola de ejecución de comandos
      state.action = {
        name:"OpenSprinkler",
        http_request:{
            request_line:
              {url:state.backendEndPoint + "/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Open Sprinkler",
              priority:"30"
            }
        }
      };
    },


    processActionForSprinklerClosing: (state, startHour, finishHour, humidityValue) => {
    // No es agregar un comando cada vez, es sumarlo a la cola.
    // Fran de su lado matchea string contra string. Va a haber N repeticiones de Abrir Aspersor en la cola de ejecución de comandos
      state.action = {
        name:"CloseSprinkler",
        http_request:{
            request_line:
              {url: state.backendEndPoint + "/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Close Sprinkler",
              priority:"29"
            }
        }
      };
    },


    processActionForRoofOpenning: (state) => {
    // No es agregar un comando cada vez, es sumarlo a la cola.
    // Fran de su lado matchea string contra string. Va a haber N repeticiones de Abrir Aspersor en la cola de ejecución de comandos
      state.action = {
        name:"OpenRoof",
        http_request:{
            request_line:
              {url:state.backendEndPoint + "/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Open Roof",
              priority:"30"
            }
        }
      };
    },


    processActionForRoofClosing: (state) => {
    // No es agregar un comando cada vez, es sumarlo a la cola.
    // Fran de su lado matchea string contra string. Va a haber N repeticiones de Abrir Aspersor en la cola de ejecución de comandos
      state.action = {
        name:"CloseRoof",
        http_request:{
            request_line:
              {url:state.backendEndPoint + "/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Close Roof",
              priority:"29"
            }
        }
      };
    },


    processActionForAirConditionerOpenning: (state) => {
    // No es agregar un comando cada vez, es sumarlo a la cola.
    // Fran de su lado matchea string contra string. Va a haber N repeticiones de Abrir Aspersor en la cola de ejecución de comandos
      state.action = {
        name:"StartUpAirConditioner",
        http_request:{
            request_line:
              {url:state.backendEndPoint + "/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Start Up Air Conditioner",
              priority:"30"
            }
        }
      };
    },


    processActionForAirConditionerClosing: (state) => {
    // No es agregar un comando cada vez, es sumarlo a la cola.
    // Fran de su lado matchea string contra string. Va a haber N repeticiones de Abrir Aspersor en la cola de ejecución de comandos
      state.action = {
        name:"ShutdownAirConditioner",
        http_request:{
            request_line:
              {url:state.backendEndPoint + "/commands",
              method:"POST",
              version:"HTTP/1.1"
            },
            headers:[],
            body:{
              command:"Shutdown Air Conditioner",
              priority:"29"
            }
        }
      };
    },


    processDataStreamsConfigured: (state, response) => {
      state.dataStreamsResponseFromBackend = response.data;
      state.dataStreamsConfigured = [];

      console.log("Amount of Streams in Response: " + state.dataStreamsResponseFromBackend.length);

      for(let i=0; i<state.dataStreamsResponseFromBackend.length; i++){
        state.dataStreams.push(state.dataStreamsResponseFromBackend[i]);


    	switch (state.dataStreamsResponseFromBackend[i].name) {
    	  case 'HumiditySensor':
    	    state.humidity=state.dataStreamsResponseFromBackend[i].current_value;
    	    break;
    	  case 'RainSensor':
    	    state.rain=state.dataStreamsResponseFromBackend[i].current_value;
    	    break;
        case 'AirConditionerSensor':
          state.airConditionerSensor=state.dataStreamsResponseFromBackend[i].current_value;
          break;
        case 'RoofSensor':
          state.roofSensor=state.dataStreamsResponseFromBackend[i].current_value;
          break;
        case 'SprinklerSensor':
          state.sprinklerSensor=state.dataStreamsResponseFromBackend[i].current_value;
          break;
    	  default: //'TemperatureSensor'
    	    state.temperature=state.dataStreamsResponseFromBackend[i].current_value;
    	}

        console.log("DataStreams =>" + state.dataStreams);
      }
      console.log(" Finishing getDataStreamsConfigured ######");
    },
  },



  //#####################################################################
  // ACTIONS
  //#####################################################################

  actions:{

    showDataStreamView: (context) => {

      axios.get(store.state.backendEndPoint + '/data-streams',{ headers: { "Accept": "application/json" } }).then(response => {

        context.commit('processDataStreamsConfigured', response);

      }, (err) => {
        console.log("[ERROR] => " + err);

      })
    },

    addNecessaryDataStreams: (context) =>{
      console.log("ENTERING addNecessaryDataStreams!!!");

      for(let i=0; i<context.state.dataStreams.length; i++){ // sumar a Cosmos todos los Streams que necesita la aplicación
        console.log("Action => " + JSON.stringify(context.state.dataStreams[i]));
        
        axios.post( store.state.backendEndPoint + '/data-streams', {
          name: context.state.dataStreams[i]
        }).then( function (response) {
          console.log("SUCCESS!!! => " + JSON.stringify(response));

        }).catch(function (error) {
          console.log("error error!!! => " + JSON.stringify(error));

        });
      }

    },

    addNecessaryActions: (context) => {
      console.log("ENTERING addNecessaryActions!!!");
      for(let i=0; i<context.state.actions.length; i++) {
        console.log("Action => " + JSON.stringify(context.state.actions[i]));

      axios.post(store.state.backendEndPoint + '/actions', {
          name: context.state.actions[i].name,
          http_request: context.state.actions[i].http_request
        }).then(function (response) {
          console.log("SUCCESS!!! => " + JSON.stringify(response));

          }).catch(function (error) {
            console.log("error error!!! => " + JSON.stringify(error));

          });
      }
    },


    lalala: (context) => {
    	window.setInterval(function(){
    	    context.dispatch('showDataStreamView');
    	}, 5000);
    }

  }
})

import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'


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


    triggers: [],
    action: undefined,
    command: undefined,
    dataStreamNames : ["RainSensor", "RoofSensor", "SprinklerSensor", "AirConditionerSensor", "HumiditySensor","TemperatureSensor"],

    // ROOF STATE VARIABLES
    roofOpenStartHour: undefined,
    roofOpenFinishHour: undefined,
    roofCloseStartHour: undefined,
    roofCloseFinishHour: undefined,
    ignoreInCaseOfRain: false,
    closeIfRain: false,

    // AIR CONDITIONER STATE VARIABLES
    temperatureValue: undefined,
    isTemperatureSet: false,

    // SPRINKLER STATE VARIABLES
    highestHumidityValue: undefined,
    lowestHumidityValue: undefined,
    sprinklerOpenStartHour: undefined,
    sprinklerOpenFinishHour: undefined,
    sprinklerCloseStartHour: undefined,
    sprinklerCloseFinishHour: undefined,


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
              priority:30
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
              priority:29
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
              priority:30
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
              priority:29
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
              priority:30
            }
        }
      },

      {
          name:"CloseRoof",
          http_request:{
          request_line:
            {url:"http://localhost:8090/commands",
            method:"POST",
            version:"HTTP/1.1"
          },
          headers:[],
          body:{
            command:"Close Roof",
            priority:29
          }
        }
      }
    ]

  },

  mutations: {

    determineClosingWindowForRoof: (state) => {
      console.log("determineClosingWindowForRoof: " + state.roofOpenStartHour + "|" + state.roofOpenFinishHour);

      if(state.roofOpenStartHour != undefined  &&  state.roofOpenFinishHour != undefined){

        let firstHour = state.roofOpenStartHour - 1;
        firstHour = firstHour.toString() + ":59:59";
        let lastHour = state.roofOpenFinishHour + ":00:01";

        state.roofCloseStartHour = lastHour;
        state.roofCloseFinishHour = firstHour;
        console.log("determineClosingWindowForRoof: " + state.roofCloseStartHour + "|" + state.roofCloseFinishHour);
      }
    },

    determineClosingWindowForSprinkler: (state) => {
      console.log("determineClosingWindowForSprinkler: " + state.sprinklerOpenStartHour + "|" + state.sprinklerOpenFinishHour);

      if(state.sprinklerOpenStartHour != undefined  &&  state.sprinklerOpenFinishHour != undefined){

        let firstHour = state.sprinklerOpenStartHour - 1;
        firstHour = firstHour.toString() + ":59:59";
        let lastHour = state.sprinklerOpenFinishHour + ":00:01";

        state.sprinklerCloseStartHour = lastHour;
        state.sprinklerCloseFinishHour = firstHour;
        console.log("determineClosingWindowForSprinkler: " + state.sprinklerCloseStartHour + "|" + state.sprinklerCloseFinishHour);
      }
    },


    processTriggerForRoofOpenning: (state) => {
      console.log("processTriggerForRoofOpenning: " + state.roofOpenStartHour + "|" + state.roofOpenFinishHour + "|" + state.closeIfRain);
      let triggerConditions = [];

      if(state.roofOpenStartHour != undefined && state.roofOpenFinishHour != undefined){
        let conditionStartHour = state.roofOpenStartHour + ":00:00";
        let conditionFinishHour = state.roofOpenFinishHour + ":00:00";

        triggerConditions.push({
          type:"time_interval",
          from: conditionStartHour,
          to: conditionFinishHour
        });
      }

      if(state.closeIfRain){
        triggerConditions.push({
          type:"data_stream_current_value",
          data_stream:"RainSensor",
          condition:{operator:"=",value: "0"}  // if it's not raining
        });
      }

      state.triggers.push({
        name:"OpenRoofBetweenHoursIfNotRaining",
        action:"OpenRoof",
        policy: {type: "periodical", time_interval: "5 minutes"},
        conditions: triggerConditions                             // Conditions vació significa 'Always'
      });
      console.log("processTriggerForRoofOpenning - Trigger => " + JSON.stringify(state.triggers));
    },


    processTriggerForRoofClosing: (state) => {
      console.log("processTriggerForRoofClosing: " + state.roofCloseStartHour + "|" + state.roofCloseFinishHour + "|" + state.closeIfRain);

      let triggerConditions = [];
      let triggerName = "CloseRoofBetweenHours";

      if(state.roofCloseStartHour===undefined && state.roofCloseFinishHour ===undefined && state.closeIfRain){

        triggerName = "CloseRoofOnlyIfRaining";
        triggerConditions.push({
          type:"data_stream_current_value",
          data_stream:"RainSensor",
          condition:{operator:"=",value:"1"}  // if it's raining
        });

      }else{

        triggerConditions.push({
          type:"time_interval",
          from: state.roofCloseStartHour,
          to: state.roofCloseFinishHour
        });

        if(state.closeIfRain){

          state.triggers.push({
            name: "CloseRoofOnlyIfRaining",
            action:"CloseRoof",
            policy: {type: "periodical", time_interval: "1 seconds"},
            conditions: [{
                type:"data_stream_current_value",
                data_stream:"RainSensor",
                condition:{operator:"=",value:"1"}  // if it's raining
              }]
          });

        }

      }

      state.triggers.push({
        name: triggerName,
        action:"CloseRoof",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: triggerConditions
      });

      console.log("processTriggerForRoofClosing - Trigger => " + JSON.stringify(state.triggers));
    },


    processTriggerForAirConditioner: (state, temperature) => {

      state.triggers.push( {
        name:"StartUpAirConditionerWhenTemperatureAbove"+temperature.toString(),
        action:"StartUpAirConditioner",
        policy: {type: "periodical", time_interval: "5 minutes"},
        conditions: [
              {
                type:"data_stream_current_value",
                data_stream:"TemperatureSensor",
                condition:{operator:">",value: temperature}
              },

              {
                type:"data_stream_current_value",
                data_stream:"AirConditionerSensor",
                condition:{operator:"=",value:0} // if it's off
              }
        ]
      });
      console.log("processTriggerForAirConditioner - Trigger => " + JSON.stringify(state.triggers));

    },


    processTriggerForAirConditionerWhenTemperatureIsBelow: (state, temperature) => {

      state.triggers.push({
        name:"ShutdownAirConditionerWhenTemperatureBelow"+temperature.toString(),
        action:"ShutdownAirConditioner",
        policy: {type: "periodical", time_interval: "1 seconds"},
        conditions: [
              {
                type:"data_stream_current_value",
                data_stream:"TemperatureSensor",
                condition:{operator:"<",value: temperature}
              },

              {
                type:"data_stream_current_value",
                data_stream:"AirConditionerSensor",
                condition:{operator:"=",value:1} // if it's off
              }
        ]
      });
      console.log("processTriggerForAirConditionerWhenTemperatureIsBelow - Trigger => " + JSON.stringify(state.triggers));

    },


    processTriggerForSprinklerClosing: (state) => {
      console.log("#### Entering processTriggerForSprinklerClosing");
      let triggerConditions = [];
      let triggerName = "CloseWinterGardenSpinkler";

      if((state.sprinklerCloseStartHour!=undefined && state.sprinklerCloseFinishHour !=undefined) || state.lowestHumidityValue != undefined || state.highestHumidityValue != undefined){
        console.log("(1)");

        if(state.sprinklerCloseStartHour != undefined && state.sprinklerCloseFinishHour != undefined){
          console.log("(2)");
          triggerName += "Between"+state.sprinklerCloseStartHour+"-"+state.sprinklerCloseFinishHour;

          triggerConditions.push({
            type:"time_interval",
            from: state.sprinklerCloseStartHour,
            to: state.sprinklerCloseFinishHour
          });

        }

        if(state.lowestHumidityValue != undefined){
          console.log("(3)");
          if(state.sprinklerCloseStartHour != undefined){
            triggerName += "AndHumidityAbove"+state.lowestHumidityValue;
          }else{
            triggerName += "WhenHumidityAbove"+state.lowestHumidityValue;
          }

          triggerConditions.push({
            type:"data_stream_current_value",
            data_stream:"HumiditySensor",
            condition:{operator:">",value: state.lowestHumidityValue.toString()}  // if it's beyond X humidity value
          });
        }


        if(state.lowestHumidityValue === undefined && state.sprinklerCloseStartHour === undefined && state.highestHumidityValue != undefined){
          triggerName += "WhenHumidityAbove"+state.highestHumidityValue;

          triggerConditions.push({
            type:"data_stream_current_value",
            data_stream:"HumiditySensor",
            condition:{operator:"<",value: state.highestHumidityValue.toString()}  // if it's beyond X humidity value
          });
        }

        console.log("(4)");
        state.triggers.push({
          name: triggerName,
          action:"CloseSprinkler",
          policy: {type: "periodical", time_interval: "1 seconds"},
          conditions: triggerConditions
        });

      }
      console.log("(5)");
      console.log("processTriggerForSprinklerClosing - Trigger => " + JSON.stringify(state.triggers));

    },


    processTriggerForSprinklerOpenning: (state) => {
      let triggerConditions = [];
      let triggerName = "OpenWinterGardenSpinkler";

      if((state.sprinklerOpenStartHour != undefined && state.sprinklerOpenFinishHour != undefined) || state.highestHumidityValue != undefined || state.lowestHumidityValue != undefined){

        if(state.sprinklerOpenStartHour!=undefined && state.sprinklerOpenFinishHour != undefined){

          triggerName += "Between"+state.sprinklerOpenStartHour.toString()+"-"+state.sprinklerOpenFinishHour.toString();
          let conditionStartHour = state.sprinklerOpenStartHour + ":00:00";
          let conditionFinishHour = state.sprinklerOpenFinishHour + ":00:00";

          triggerConditions.push(
            {
              type:"time_interval",
              from: conditionStartHour,
              to: conditionFinishHour
            });
        }

        if(state.highestHumidityValue!=undefined){

          if(state.sprinklerOpenStartHour!=undefined){
            triggerName += "AndIfHumidityBelow"+state.highestHumidityValue;
          }else{
            triggerName += "IfHumidityBelow"+state.highestHumidityValue;
          }

          triggerConditions.push(
            {
              type:"data_stream_current_value",
              data_stream:"HumiditySensor",
              condition:{operator:"<",value: state.highestHumidityValue.toString()}  // if it's below X humidity value
            }
          );

        }

        if(state.highestHumidityValue === undefined && state.sprinklerOpenStartHour === undefined && state.lowestHumidityValue != undefined){
          triggerName += "WhenHumidityAbove"+state.lowestHumidityValue;

          triggerConditions.push({
            type:"data_stream_current_value",
            data_stream:"HumiditySensor",
            condition:{operator:"<",value: state.lowestHumidityValue.toString()}  // if it's beyond X humidity value
          });
        }


        state.triggers.push({
          name: triggerName,
          action:"OpenSprinkler",
          policy: {type: "periodical", time_interval: "1 seconds"},
          conditions: triggerConditions
        });
      }
      console.log("processTriggerForSprinklerOpenning - Trigger => " + JSON.stringify(state.triggers));
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
      }
    },


    addTriggers: (state) => {
        for(let i=0; i<state.triggers.length; i++) {
          console.log(">>> Trigger to add: " + JSON.stringify(state.triggers[i]));
          axios.post(state.backendEndPoint + '/triggers', {
            name: state.triggers[i].name,
            action: state.triggers[i].action,
            policy: state.triggers[i].policy,
            conditions: state.triggers[i].conditions,
          }).then(function (response) {
            console.log("SUCCESS!!! => " + JSON.stringify(response));
          }).catch(function (error) {
            console.log("error error!!! => " + JSON.stringify(error));
          });

      }
      state.triggers = [];
    },

    setIsTemperatureSet: (state, newValue) => {
        state.isTemperatureSet = newValue;
    },

    setTemperatureValue: (state, newValue) => {
        state.temperatureValue = newValue;
    },

    setCloseIfRain: (state, newValue) => {
        state.closeIfRain = newValue;
    },

    setRoofOpenStartHour: (state, newValue) => {
        state.roofOpenStartHour = newValue;
    },

    setRoofOpenFinishHour: (state, newValue) => {
        state.roofOpenFinishHour = newValue;
    },



    setSprinklerOpenStartHour: (state, newValue) => {
        state.sprinklerOpenStartHour = newValue;
    },

    setSprinklerOpenFinishHour: (state, newValue) => {
        state.sprinklerOpenFinishHour = newValue;
    },

    setHighestHumidityValue: (state, newValue) => {
        state.highestHumidityValue = newValue;
    },

    setLowestHumidityValue: (state, newValue) => {
        state.lowestHumidityValue = newValue;
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

      for(let i=0; i<context.state.dataStreamNames.length; i++){ // sumar a Cosmos todos los Streams que necesita la aplicación
        console.log("Action => " + JSON.stringify(context.state.dataStreamNames[i]));

        axios.post( store.state.backendEndPoint + '/data-streams', {
          name: context.state.dataStreamNames[i]
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
    },



/* SI DEJA LAS HORAS EN BLANCO, Y SELECCIONA CERRAR EN CASO DE LLUVIA => ASUMO SIEMPRE ABIERTO, CIERRO EN CASO DE LLUVIA */
    addTriggersForRoof: (context) => {
      console.log("####### Entering addTriggersForRoof");
      console.log("Temperature: " + context.state.roofOpenStartHour + "|| IsTemperatureSet: " + context.state.roofOpenFinishHour + " || ignoreInCaseOfRain: " + context.state.closeIfRain);

      context.commit('processTriggerForRoofOpenning'); // asume que si quiere cerrar en caso de lluvia, tambien no abre el techo si llueve.
      context.commit('determineClosingWindowForRoof');
      context.commit('processTriggerForRoofClosing');
      context.commit('addTriggers');

    },




    addTriggersForAirConditioner: (context) => {
      console.log("####### Entering addTriggersForAirConditioner");
      console.log("Temperature: " + context.state.temperatureValue + "|| IsTemperatureSet: " + context.state.isTemperatureSet);

      if(context.state.isTemperatureSet){
        context.commit('processTriggerForAirConditioner', context.state.temperatureValue);
        context.commit('processTriggerForAirConditionerWhenTemperatureIsBelow', context.state.temperatureValue);
        context.commit('addTriggers');
      }
    },



    addTriggersForSprinkler: (context) => {
        console.log("sprinklerOpenStartHour: " + context.state.sprinklerOpenStartHour + "|| sprinklerOpenFinishHour: " + context.state.sprinklerOpenFinishHour);
        console.log("sprinklerCloseStartHour: " + context.state.sprinklerCloseStartHour + "|| sprinklerCloseFinishHour: " + context.state.sprinklerCloseFinishHour);
        console.log("highestHumidityValue: " + context.state.highestHumidityValue + "|| lowestHumidityValue: " + context.state.lowestHumidityValue);

        context.commit('processTriggerForSprinklerOpenning');
        context.commit('determineClosingWindowForSprinkler');
        context.commit('processTriggerForSprinklerClosing');
        context.commit('addTriggers');
    },



    setIsTemperatureSet: (context, newValue) => {
      console.log("setIsTemperatureSet: " + newValue);
      context.commit('setIsTemperatureSet', newValue);
    },



    setTemperatureValue: (context, newValue) => {
      console.log("setTemperatureValue: " + newValue);
      context.commit('setTemperatureValue', newValue);
    },

    setCloseIfRain: (context, newValue) => {
      console.log("setCloseIfRain: " + newValue);
      context.commit('setCloseIfRain', newValue);
    },

    setRoofOpenStartHour: (context, newValue) => {
      console.log("setRoofOpenStartHour: " + newValue);
      context.commit('setRoofOpenStartHour', newValue);
    },

    setRoofOpenFinishHour: (context, newValue) => {
      console.log("setRoofOpenFinishHour: " + newValue);
      context.commit('setRoofOpenFinishHour', newValue);
    },

    setSprinklerOpenStartHour: (context, newValue) => {
      console.log("setSprinklerOpenStartHour: " + newValue);
      context.commit('setSprinklerOpenStartHour', newValue);
    },

    setSprinklerOpenFinishHour: (context, newValue) => {
      console.log("setSprinklerOpenFinishHour: " + newValue);
      context.commit('setSprinklerOpenFinishHour', newValue);
    },

    setHighestHumidityValue: (context, newValue) => {
      console.log("setHighestHumidityValue: " + newValue);
      context.commit('setHighestHumidityValue', newValue);
    },

    setLowestHumidityValue: (context, newValue) => {
      console.log("setLowestHumidityValue: " + newValue);
      context.commit('setLowestHumidityValue', newValue);
    },

  }

})

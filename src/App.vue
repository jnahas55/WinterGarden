<template>
  <div id="app">

    <ui-header></ui-header>
    <dashboard></dashboard>
    <sprinkler-modal></sprinkler-modal>
    <roof-modal></roof-modal>
    <air-conditioner-modal></air-conditioner-modal>
    
  </div>
</template>

<script>

import Dashboard from './components/Dashboard.vue'
import Header from './components/Header.vue'
import AirConditionerModal from './components/AirConditionerModal.vue'
import SprinklerModal from './components/SprinklerModal.vue'
import RoofModal from './components/RoofModal.vue'

export default {
  name: 'App',
  components: {
    'sprinkler-modal': SprinklerModal,
    'roof-modal': RoofModal,
    'dashboard': Dashboard,
    'ui-header': Header,
    'air-conditioner-modal': AirConditionerModal
  }
}
</script>

<style>
#app {
    background-image: url("assets/open_roof.jpg");
    background-repeat: repeat-y;
    background-size:1301px 744px;
}
</style>

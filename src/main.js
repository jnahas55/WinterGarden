// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'

import Vue from 'vue'
import { store } from './store/store.js'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store, // becomes available for the #app
  el: '#app',
  components: { App },
  template: '<App/>'
})

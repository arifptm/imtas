// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import moment from 'moment'
Vue.prototype.$moment = moment

import VueSweetalert2 from 'vue-sweetalert2';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);

axios.defaults.baseURL = 'http://im.tas/api/'
// axios.defaults.headers.common = {'Authorization': 'Bearer ' + Vue.auth.getToken(), 'Accept': 'application/json'}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>',

  data(){
  	return{
  		drawer: null,
  		pageTitle: '',
  	}
  }
})

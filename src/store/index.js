import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  	drawer:null,
  	pageTitle:'',
    count: 0
  },

  mutations: {
    increment (state) {
      state.count++
    },

    setPageTitle(){
    	state.pageTitle = 'metal'	
    },
    
    openDrawer (state){
      state.drawer = true
    },

    closeDrawer (state){
    	state.drawer = false
    },

    setDrawer (state){
      state.drawer = !state.drawer
    }
    
  }
})

export default store
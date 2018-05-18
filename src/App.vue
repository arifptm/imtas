<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" fixed app dark v-if="isAuth === true" width="200">
      <v-toolbar color="primary">
        <v-toolbar-title v-html="selected">
        </v-toolbar-title>          
      </v-toolbar>
    
      <v-list dark>
        <template v-for="(item, i) in items" >
          <v-list-tile ripple  :to='item.url' active-class="yellow--text grey darken-2">
            <v-list-tile-action>
              <v-icon v-html="item.icon" ></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="i==2"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed v-if="isAuth === true"> 
      <v-toolbar-side-icon @click="setDrawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="$router.push('/')">{{ $root.pageTitle }}</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {

  name: 'App',

  data () {   
    return {
      isAuth: false,
      drawer:null,
      selected:'',
      items: [
        {icon: 'flag', title: 'Kegiatan', url: '/kegiatan' },
        {icon: 'people', title: 'Peserta', url: '/peserta' },
        {icon: 'event', title: 'Jadwal', url: '/jadwal' },
        {icon: 'hourglass_full', title: 'Pelaksanaan', url: '/imtas' },
      ],
      pageTitle:'IMTAS' 
    }
  },
  
  created(){
    this.isAuth = this.$auth.isAuthenticated()
    let event = JSON.parse(localStorage.getItem('kegiatan'))
    if (event != null){ 
      this.selected = this.$moment(event.periode).format('YYYY') +  ' &mdash; '  + event.cabang 
    }
  },  

  methods:{    
    setDrawer(){
      this.drawer = !this.drawer
    }
  }

}
</script>
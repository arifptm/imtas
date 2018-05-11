<template>
	<v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="$root.drawer"
      enable-resize-watcher
      fixed
      app
      dark
    >
      <v-toolbar color="primary">
        <v-toolbar-title>
          {{ selected }}
        </v-toolbar-title>          
        </v-toolbar>
      </v-toolbar>
      <v-list dark>
        <v-list-tile ripple v-for="(item, i) in items" :key="i" :to='item.url' active-class="yellow--text grey darken-2" >
          <v-list-tile-action>
            <v-icon v-html="item.icon" ></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
	export default{
		data(){
			return {
        selected:'',
				clipped: false,
				miniVariant: false,
				items: [
          {icon: 'event', title: 'Kegiatan', url: '/kegiatan' },
          {icon: 'people', title: 'Peserta', url: '/peserta' },
          {icon: 'event', title: 'Jadwal', url: '/jadwal' },
        ],
		  }
		},

    created(){
      let event = JSON.parse(localStorage.getItem('kegiatan'))
      if (event != null)
      { this.selected = this.$moment(event.periode).format('YYYY') +  ' -- '  + event.cabang }
      // this.drawer = this.$store.state.drawer
    },

		computed:{
		},

    methods:{
      
    }
		
	}
</script>
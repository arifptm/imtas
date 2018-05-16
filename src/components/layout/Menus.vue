<template>
	<div>
		<v-toolbar app>      
			<v-toolbar-side-icon @click="setDrawer"></v-toolbar-side-icon>
			<v-toolbar-title>{{ $root.pageTitle }}</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-toolbar>

		<v-navigation-drawer
	      persistent
	      clipped
	      v-model="drawer"
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
	</div>

</template>

<script>
	export default{
		data(){
			return {
				drawer:null,
        		selected:'',
				items: [
					{icon: 'flag', title: 'Kegiatan', url: '/kegiatan' },
					{icon: 'people', title: 'Peserta', url: '/peserta' },
					{icon: 'event', title: 'Jadwal', url: '/jadwal' },
					{icon: 'hourglass_full', title: 'Pelaksanaan', url: '/imtas' },
        		],				
			}
		},

		created(){
			let event = JSON.parse(localStorage.getItem('kegiatan'))
			if (event != null){ 
				this.selected = this.$moment(event.periode).format('YYYY') +  ' -- '  + event.cabang 
			}
	  	},

		methods:{	
			setDrawer(){
				this.drawer = !this.drawer
			}		
		}

	}
</script>
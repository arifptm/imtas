<template>
	  <v-toolbar app :clipped-left="clipped">
      
      <v-toolbar-side-icon @click="setDrawer()"></v-toolbar-side-icon>          
      <v-toolbar-title>{{ $root.pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
</template>

<script>
	export default{
		data(){
			return {
				miniVariant: false,
				clipped: false, 
			}
		},

		methods:{
			setDrawer(){        
				this.$root.drawer = !this.$root.drawer
			}
		}

	}
</script>
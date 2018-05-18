<template>
	<div>
		<v-toolbar color="green" dark flat height="75px">						
			<v-toolbar-title class="white--text" v-html="title"></v-toolbar-title>		 
		</v-toolbar>
			<v-card>
		  	<v-container fluid grid-list-lg>
					<v-slide-y-transition mode="out-in">
						<v-layout row wrap>	
		    			<v-flex xs6>
								<v-card class="red lighten-3" ripple to="/login/super">
							  	<v-card-text >
							  	  Peran<div class="title">Super Admin</div>
							  	</v-card-text>
								</v-card>
							</v-flex>								
							<v-flex xs6>
								<v-card class="blue lighten-5" ripple to="/login/admin">
							  	<v-card-text >
							  	  Peran<div class="title">Administrator</div>
							  	</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</v-slide-y-transition>
				</v-container>
			</v-card>

			<v-card>
			  
		  	<v-container fluid grid-list-lg>
					<v-slide-y-transition mode="out-in">
						<v-layout row wrap>	
		    			<v-flex xs6 md3 v-for="item,i in items" :key="item.abbr">
							  <v-card class="green lighten-5" ripple @click.native="">
							  	<v-card-text >
							  	  Penguji<div class="title">{{ item.materi }}</div>
							  	</v-card-text>

								</v-card>
							</v-flex>	
						</v-layout>
					</v-slide-y-transition>
				</v-container>
			  
			</v-card>


</div>
</template>

<script>

	export default {
		
		data(){
			return{
				events:[],
				items:[
					{ materi:'Fashohah', abbr:'fsh'},
					{ materi:'Tartil', abbr:'trl'},
					{ materi:'Ghorib', abbr:'grb'},
					{ materi:'Tajwid', abbr:'tjw'},
					{ materi:'Surat pendek', abbr:'srt'},
					{ materi:'Doa', abbr:'doa'},
					{ materi:'Sholat', abbr:'sht'},
					{ materi:'Wudlu', abbr:'wdl'},
				]
			}
		},

		created(){
			this.title = "PERAN/PENGUJI <small>&mdash; pilih salah satu</small>"
			// this.axios.get('/kegiatan')
			// .then(res=>{
			// 	// console.log(res.data)
			// 	this.events = res.data.data
			// })
		},

		methods:{
			
		}

	}

</script>


<template>
	<div>
		<v-toolbar color="green" dark>
			
			<v-btn icon v-if="steper > 1" @click="steper = steper-1">
				<v-icon>arrow_back</v-icon>
			</v-btn>
			
			<v-toolbar-title class="white--text" v-html="title"></v-toolbar-title>		 
		</v-toolbar>

		<v-stepper v-model="steper">
			<v-stepper-header>
		    <v-stepper-step :complete="steper > 1" step="1">Pilih kegiatan</v-stepper-step>
		    <v-divider></v-divider>
		    <v-stepper-step :complete="steper > 2" step="2">Pilih peran</v-stepper-step>
		    <v-divider></v-divider>
		    <v-stepper-step step="3">Siap menguji</v-stepper-step>
		  </v-stepper-header>
			<v-stepper-items>
				
				<v-stepper-content step="1">
					<v-container fluid grid-list-lg class="pa-0">
						<v-slide-y-transition mode="out-in">
							<v-layout row wrap>									
								<v-flex xs6 md3 v-for="event,i in events" :key="i">
								  <v-card dark ripple @click.native="toStep2(event.id)">
								  	<v-card-text class="text-xs-center">
								  	  <div class="title">Korcab {{ event.cabang }}</div>
								  	  <div>Periode {{ $moment(event.periode).format('YYYY')  }}</div>
								  	</v-card-text>
									</v-card>
								</v-flex>	
							</v-layout>
						</v-slide-y-transition>
					</v-container>
				</v-stepper-content>

				<v-stepper-content step="2">
					<v-container fluid grid-list-lg class="pa-0">
						<v-slide-y-transition mode="out-in">
							<v-layout row wrap>	
								<v-flex xs12>
									<v-card class="blue lighten-5" ripple to="/login/admin">
								  	<v-card-text class="text-xs-center">
								  	  <div class="title">Administrator</div>
								  	</v-card-text>
									</v-card>
								</v-flex>								
								<v-flex xs6 md3 v-for="item,i in items" :key="item.abbr">
								  <v-card class="green lighten-5" ripple @click.native="toStep3">
								  	<v-card-text class="text-xs-center">
								  	  Penguji<div class="title">{{ item.materi }}</div>
								  	</v-card-text>
									</v-card>
								</v-flex>	
							</v-layout>
						</v-slide-y-transition>
					</v-container>
				</v-stepper-content>

				<v-stepper-content step="3">
					<v-container fluid fill-height>
	        <v-layout align-center justify-center>
	          <v-flex xs12 sm8 md4 >
	            <v-card>
	              <v-toolbar flat dense dark color="blue">
	                <v-toolbar-title>Login IMTAS</v-toolbar-title>
	              </v-toolbar>
	              <v-card-text>
	                <v-form>
	                  <v-text-field prepend-icon="person" label="Login" type="text" v-model="email"></v-text-field>
	                  <v-text-field prepend-icon="lock"  label="Password" id="password" type="password" v-model="password"></v-text-field>
	                </v-form>
	              </v-card-text>
	              <v-card-actions>
	                <v-spacer></v-spacer>
	                <v-btn block round depressed color="blue" dark @click="login">Login</v-btn>
	                <v-spacer></v-spacer>
	              </v-card-actions>
	            </v-card>
	          </v-flex>
	        </v-layout>
	      </v-container>
	    </v-stepper-content>
	      
	    </v-card>
			</v-stepper-items>
		</v-stepper>

</div>
</template>

<script>

	export default {
		
		data(){
			return{
				title:'',
				events:[],
				kegiatan_id:'',				
				steper:0,
				items:[
					{ materi:'Fashohah', abbr:'fsh'},
					{ materi:'Tartil', abbr:'trl'},
					{ materi:'Ghorib', abbr:'grb'},
					{ materi:'Tajwid', abbr:'tjw'},
					{ materi:'Surat Pendek', abbr:'srt'},
					{ materi:'Doa', abbr:'doa'},
					{ materi:'Sholat', abbr:'sht'},
					{ materi:'Wudlu', abbr:'wdl'},
				]
			}
		},

		created(){
			this.title = "KEGIATAN <small>pilih salah satu</small>"
			this.axios.get('/kegiatan')
			.then(res=>{
				// console.log(res.data)
				this.events = res.data.data
			})


		},

		methods:{
			toStep2(id){
				this.steper = 2
				this.kegiatan_id =  id
				this.title = "PERAN <small>pilih salah satu</small>"
			},

			toStep3(){
				this.steper = 3
				this.title = "<small>Silakan</small> LOGIN"
			}
		}

	}

</script>

<style scoped>
  .stepper{
  	box-shadow:none;
	}
</style>

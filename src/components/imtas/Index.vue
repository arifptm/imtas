<template>
  <v-container fluid grid-list-lg>

    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="display-1 primary--text"><p>Pelaksanaan Kegiatan</p></h1>
        </v-flex>
        
			<v-flex xs12 md4 xl3>
				<v-list >
					<v-divider></v-divider>
					<template v-for="jadwal,i in jadwals">
					  <v-list-tile avatar>
					    <v-list-tile-content>
					      <v-list-tile-title>	      	
					      	Shif #{{ jadwal.shift }}
					      </v-list-tile-title>
					      <v-list-tile-sub-title>
					      	{{ $moment(jadwal.tanggal).format('DD-MM-YYYY') }}
					      </v-list-tile-sub-title>
					    </v-list-tile-content>
					    <v-list-tile-action>
					    	
					    	<v-btn v-if="activeIds.includes(jadwal.id)" color="blue white--text" @click="stopImtas(jadwal.id)">
					    		<v-progress-circular :width="2" indeterminate color="yellow" size="12"></v-progress-circular> &nbsp; stop
					    	</v-btn>

					      	<v-btn v-else color="white--text red" @click="startImtas(i)">mulai</v-btn>
					    </v-list-tile-action>
					    <v-list-tile-action>
					    	<v-btn icon ripple @click="displayImtas(i)" :disabled="!activeIds.includes(jadwal.id)">
					    		<v-icon>visibility</v-icon>
					    	</v-btn>
					    </v-list-tile-action>
					  </v-list-tile>
					  <v-divider v-if="jadwal.shift==4"></v-divider>
					</template>
				</v-list>

			</v-flex>
			<v-flex xs12 md8 xl9>
        <div v-if="activeIds.length > 0">
          <h4 class="title mb-1"><span class="body-2">{{ $moment(actived.tanggal).format("DD-MM-YYYY") }}</span> | <span class="blue--text">Shift #{{ actived.shift }}</span></h4>
        <v-tabs grow v-model="tab" slider-color="blue">
          <v-tab ripple >Nilai</v-tab>
          <v-tab-item>
            <v-card flat>
              
         <v-data-table
              :headers="headers"
              :items="actived.imtases"
              hide-actions
              class="elevation-1 mb-4"
            >
              <template slot="items" slot-scope="props">      
                <td>{{ props.item.peserta.nama }}<br>{{ props.item.tpq_imtas.tpq.nama }}</td>
                
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_fsh == 0" indeterminate color="green"> </v-progress-circular>

                  <span v-else>{{ props.item.nilai_fsh }}</span>
                </td>
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_trl == 0" indeterminate color="green"> </v-progress-circular>
                  <span v-else>{{ props.item.nilai_trl }}</span>
                </td>
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_grb == 0" indeterminate color="green"> </v-progress-circular>
                  <span v-else>{{ props.item.nilai_grb }}</span>
                </td>
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_tjw == 0" indeterminate color="green"> </v-progress-circular>
                  <span v-else>{{ props.item.nilai_tjw }}</span>
                </td>                                                
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_srt == 0" indeterminate color="green"> </v-progress-circular>
                  <span v-else>{{ props.item.nilai_srt }}</span>
                </td>
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_doa == 0" indeterminate color="green"> </v-progress-circular>
                  <span v-else>{{ props.item.nilai_doa }}</span>
                </td>                
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_sht == 0" indeterminate color="green"> </v-progress-circular>
                  <span v-else>{{ props.item.nilai_sht }}</span>
                </td>
                <td class="px-0 text-xs-center"> <v-progress-circular size="18" :width="2" v-if="props.item.nilai_wdl == 0" indeterminate color="green"> </v-progress-circular>
                  <span v-else>{{ props.item.nilai_wdl }}</span>
                </td>

              </template>
            </v-data-table>    
           
            </v-card>
          </v-tab-item>

          <v-tab ripple >Grafik</v-tab>
          <v-tab-item>
            <v-card flat class="pt-4">
              <v-card-text>
                
              
                <v-layout row wrap>

                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Fashohah</div>
                       <v-progress-circular :value="12.50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Tartil</div>
                       <v-progress-circular :value="50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Ghorib</div>
                       <v-progress-circular :value="12.50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Tajwid</div>
                       <v-progress-circular :value="50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Surat pendek</div>
                       <v-progress-circular :value="12.50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Doa</div>
                       <v-progress-circular :value="50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>
                
                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Sholat</div>
                       <v-progress-circular :value="12.50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-card>
                      <v-card-text class="text-xs-center">
                        <div class="title mb-3">Wudlu</div>
                       <v-progress-circular :value="50" :width="40" color="blue-grey" size="150"></v-progress-circular>
                     </v-card-text>
                    </v-card>
                  </v-flex>                
                </v-layout>
                </v-card-text>
            </v-card>
          </v-tab-item>          

        </v-tabs>

</div>
         
			</v-flex>

        
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>

  export default{
    components:{},
    data(){
      return{
         activeIds: [],
         active:'',
         actived:{},
         jadwals:[],
         headers:[
 			      { text: 'Nama santri', value: 'peserta.nama'},            
            { text: 'Fsh', class:"px-0", align:'center', value:'nilai_fsh', sortable:false},
            { text: 'Trl', class:"px-0", align:'center', value:'nilai_trl', sortable:false},
            { text: 'Grb', class:"px-0", align:'center', value:'nilai_grb', sortable:false},
            { text: 'Tjw', class:"px-0", align:'center', value:'nilai_tjw', sortable:false},
            { text: 'Srt', class:"px-0", align:'center', value:'nilai_srt', sortable:false},
            { text: 'Doa', class:"px-0", align:'center', value:'nilai_doa', sortable:false},
            { text: 'Sht', class:"px-0", align:'center', value:'nilai_sht', sortable:false},
            { text: 'Wdl', class:"px-0", align:'center', value:'nilai_wdl', sortable:false},
         ],
         tab: null,
      }
    },

    created(){
    	this.$root.pageTitle = 'Pelaksanaan Imtas'
    	this.getJadwals()
      this.getStorageData()
    },

    mounted(){
      // let fa = this.jadwals.filter(item => item.id == 256 )
        // let fa = this.jadwals.indexOf(this.active)
        
        // this.actived = this.jadwals[0]
    },    

    computed:{
    	showData(){
    		let fa = this.jadwals.filter(item => item.id == this.active)
        this.actived = fa[0]
        return 'true'
    	},

      selesai(){
        return this.jadwals.filter(item => item.id == this.active)
      }

    },

    methods:{

      displayActive(i){
        // this.actived = this.jadwals.filter(item => item.id == this.active)
        this.actived = this.jadwals[i]
      },

      getStorageData(){
        this.active = JSON.parse(localStorage.getItem('active') || '') 
        this.activeIds = JSON.parse(localStorage.getItem('activeIds') || "[]")
      },

	    getJadwals(){
	        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
	        
		        this.axios.post('api/jadwal/list', kegiatan)
		        .then(res=>{
		          //console.log(res.data)
		          this.jadwals = res.data
		        })

	        this.tm = setTimeout(this.getJadwals,5000)
	    },

      displayImtas(i){
        this.actived = this.jadwals[i]
      },


	    startImtas(i){
        let ji = this.jadwals[i].id
        
        this.active = JSON.parse(localStorage.getItem('active'))
        localStorage.setItem('active', ji)

        this.activeIds.push(ji)
        localStorage.setItem('activeIds', JSON.stringify(this.activeIds))

        this.displayActive(i)
        
        // this.activeIds.push(this.jadwals[i].id)
	    	// this.actives = this.jadwals[i]
	    	// this.axios.post('/jadwal/activate', {id})
	    	// .then(res=>{
	    	// 	// console.log(res.data)
	    	// 	this.imtases = res.data
	    	// })
	    },

	    stopImtas(id){
	    	let ta = this.activeIds.indexOf(id)
	    	this.activeIds.splice(ta,1)
        localStorage.setItem('activeIds', JSON.stringify(this.activeIds))
	    	// console.log(ff)
	    }
    },

    beforeDestroy(){
			clearTimeout(this.tm)
	},
  }

</script>


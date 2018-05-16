<template>
  <v-dialog v-model="dialog" max-width="560px" scrollable>
    <v-card v-if=" yetScheduled > 0">
      <v-card-title>
        <h3 class="headline mb-0">Santri belum terjadwal</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>        
        <v-list>
          <template v-for="tpqImtas in tpqImtases">
            <v-list-tile v-if="tpqImtas.pesertas.length > 0">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ tpqImtas.tpq.nama }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                {{ tpqImtas.pesertas.length }} santri
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn color="success" icon ripple @click="openScheduleDialog(tpqImtas)">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-list-tile-action>            
            </v-list-tile>
            <v-divider v-if="tpqImtas.pesertas.length != 0"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-text>
        <p class="headline ma-5 text-xs-center">Semua peserta sudah dijadwalkan.</p>
      </v-card-text>
      
    </v-card>

    <Schedule @close='reloadData' :tpqImtas="tpqImtas" ref="schedule"></Schedule>

  </v-dialog>

</template>


<script>

  import Schedule from '@/components/jadwal/Schedule'
  
  export default{
    
    components:{Schedule},

    data(){
      return{
        dialog: false,
        tpqImtases:[],
        tpqImtas:{}
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },    

    created(){
      this.getTpqImtases()
    },

    computed:{
      yetScheduled(){
        if(this.tpqImtases.length > 0) { 
          let yet = this.tpqImtases.map(item => item.pesertas.length).reduce((a, b) => a + b)
          return yet > 0 ? true : false
        } else {
          return false 
        }

      }
    },

    methods:{

      reloadData(){
        this.getTpqImtases()
        this.close()  
        this.$emit('reload')
      },

      close () {        
        this.dialog = false        
          this.tpqImtas = {}          
      }, 

      getTpqImtases(){
        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
        if (kegiatan != null){
          this.axios.post('/tpqimtas', {'kegiatan_id': kegiatan.id})
          .then(response=>{
            this.tpqImtases = response.data
          })
        }
      },

      openScheduleDialog(item){
        // console.log(item.pesertas.length)
        this.$refs.schedule.dialog = true
        this.tpqImtas.id = item.id
        let jumlahImtasOption = []
        for(var i=1; i<=item.pesertas.length; i++){
          jumlahImtasOption.push({
            text: i + ' orang',
            value: i
          })
        }

        this.$refs.schedule.items = jumlahImtasOption.reverse()
      }
    },

  }

</script>

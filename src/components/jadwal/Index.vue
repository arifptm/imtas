<template>
  <v-container fluid grid-list-lg>
    
    <Sidebar ref="sidebar"></Sidebar>
    <Navbar ref="navbar"></Navbar>

    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs4 >
          <div v-for="jadwal,i in jadwals">
            <v-toolbar dense color="blue lighten-1" >
              <v-toolbar-title class="white--text">{{ $moment(i).format('DD-MM-YYYY') }}</v-toolbar-title>
            </v-toolbar>
            <v-list class="elevation-2">
              <v-list-tile v-for="shift,i in jadwal" :key="i" @click.stop="getImtases(shift)"> 
                <v-list-tile-content>
                  <v-list-tile-title >Shift {{ shift.shift }}</v-list-tile-title>                  
                </v-list-tile-content>
                
                <v-list-tile-action>
                  {{ shift.imtases.length }} santri
                </v-list-tile-action>
                
                <v-list-tile-action>
                  <v-btn icon ripple @click="openCreateDialog(shift.id)">
                    <v-icon color="grey lighten-1">add</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-flex>

        <v-flex xs8>
        <!-- <v-flex xs8 v-if="imtases.length == 0">>
          <h1 class="headline primary--text"><p></p></h1>
          <p class="title" Belum ada peserta</p>
        </v-flex> -->
        <v-container>
          <v-layout row wrap>
            
          
        


        <v-flex sm6 >
          <div class="subheading pt-4">Jumlah peserta {{ imtases.length }} santri</div>
        </v-flex>

        <v-flex sm6>
          <v-text-field v-model="cari" hide-details append-icon="search"
            label="Cari nama / wali / lembaga"
          ></v-text-field>
        </v-flex>

        <v-flex sm12>
          
        
          <v-data-table
            :headers="headers"
            :items="imtases"
            :rows-per-page-items='[10,25,50,{"text":"Semua","value":-1}]'
            class="elevation-1"
            :search= 'cari'
          >
            <template slot="items" slot-scope="props">      
              <td>{{ props.item.peserta.nama }}</td>
              <td>{{ props.item.peserta.wali }}</td>
              <td>{{ props.item.peserta.usia_sekarang }}</td>
              <td>{{ props.item.tpq_imtas.tpq.nama }}</td>
            </template>
          </v-data-table>          
        </v-flex>
</v-layout>
          </v-container>
        </v-flex>        
      </v-layout>
    </v-slide-y-transition>

    <Create ref="create" @reload="getData"></Create>

  </v-container>
</template>

<script>
  
  import Sidebar from '@/components/layout/Sidebar'
  import Navbar from '@/components/layout/Navbar'

  import Create from '@/components/jadwal/Create'

  export default{
    components:{Sidebar, Navbar, Create},
    data(){
      return{
        cari:'',
        jadwals:{},
        imtases:[],
        headers: [
              { text: 'Nama santri', value: 'nama'},
              { text: 'Usia', value: 'wali'},
              { text: 'Nama Wali', sortable: false, value: 'usia_sekarang'},
              { text: 'Lembaga', value: 'tpq_imtas.tpq.nama'},
        ]
      }
    },

    created(){
      this.$root.pageTitle='Jadwal'
      this.getData()
    },

    methods:{
      getData(){
        this.getJadwals()
        this.getImtases()  
      },

      getJadwals(){
        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
        this.axios.post('/jadwal', kegiatan)
        .then(res=>{
          //console.log(res.data)
          this.jadwals = res.data
        })
      },

      getImtases(jadwal){
        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
        this.axios.post('/imtas/peserta', {'jadwal':jadwal, 'kegiatan': kegiatan})
        .then(res=>{
          // console.log(res.data)
          this.imtases = res.data
        })

      },

      openCreateDialog(id){
        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
        this.$refs.create.tpqImtas.kegiatan_id = kegiatan.id
        this.$refs.create.tpqImtas.jadwal_id = id
        this.$refs.create.dialog=true
      }

    }
  }

</script>

<template>
  <v-container fluid grid-list-lg>
    
    <Sidebar ref="sidebar"></Sidebar>
    <Navbar ref="navbar"></Navbar>

    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs12 v-if="pesertas.length == 0">>
          <h1 class="headline primary--text"><p></p></h1>
          <p class="title" Belum ada peserta, silakan <vue-xlsx-table @on-select-file="importPeserta" style="font-size:1rem;">import</vue-xlsx-table> data!</p>
        </v-flex>

        <v-flex sm6 >
          <div class="subheading pt-4">Jumlah peserta {{ pesertas.length }} santri</div>
        </v-flex>

        <v-flex sm6>
          <v-text-field v-model="cari" hide-details append-icon="search"
            label="Cari nama / wali / lembaga"
          ></v-text-field>
        </v-flex>

          
        <v-flex xs12>



        <v-data-table
          :headers="headers"
          :items="pesertas"
          :rows-per-page-items='[10,25,50,{"text":"Semua","value":-1}]'
          class="elevation-1"
          :search= 'cari'
        >
          <template slot="items" slot-scope="props">      
            <td>{{ props.item.nama }}</td>
            <td>{{ props.item.wali }}</td>
            <td>{{ props.item.usia_sekarang }}</td>
            <td>{{ props.item.tpq_imtas.tpq.nama }}</td>            
          </template>
        </v-data-table>
          
        </v-flex>
        
      </v-layout>
    </v-slide-y-transition>

    <Preview ref="preview"></Preview>

  </v-container>
</template>

<script>
  
  import Sidebar from '@/components/layout/Sidebar'
  import Navbar from '@/components/layout/Navbar'
  import Preview from '@/components/peserta/Preview'

  import Vue from 'vue'
  import vueXlsxTable from 'vue-xlsx-table'
  Vue.use(vueXlsxTable, {rABS: false})

  export default{
    components:{Sidebar, Navbar, Preview},
    
    data(){
      return{
        cari:'',
        pesertas:[],
        headers: [
              { text: 'Nama santri', value: 'nama'},
              { text: 'Usia', value: 'wali'},
              { text: 'Nama Wali', sortable: false, value: 'usia_sekarang'},
              { text: 'Lembaga', value: 'tpq_imtas.tpq.nama'},
        ]
      }
    },

    created(){
      this.$root.pageTitle = 'Peserta'      
      this.getPesertas()
    },

    methods:{      

      getPesertas(){
        let event = JSON.parse(localStorage.getItem('kegiatan'))
        
        if(event != null){
          this.axios.post('/peserta', {id: event.id})
          .then(res=>{
            this.pesertas = res.data
          })
        } else {
          this.$router.push({ path: '/kegiatan'})
          this.$swal('Ops','Pilih salah satu kegiatan dulu!', 'info')
        }        
      },

      importPeserta(convertedData){    
        let data = (convertedData.body)     
        this.$refs.preview.pesertas = data
        console.log(data)
        // this.axios.post('/peserta/import', {'data': data, 'kegiatan': this.kegiatan})
        // .then(response=>{
        //   console.log(response.data)
        // })
      },

    }

  }

</script>


<template>
  <v-container fluid grid-list-lg>
    
    <Sidebar ref="sidebar"></Sidebar>
    <Navbar ref="navbar"></Navbar>

    <v-slide-y-transition mode="out-in">
      <v-layout row wrap v-if="pesertas.length == 0">
        <v-flex xs12 >
          <h1 class="headline primary--text"><p></p></h1>
          <p class="title"> Belum ada peserta, silakan <vue-xlsx-table @on-select-file="importPeserta" style="font-size:1rem;">import</vue-xlsx-table> data!</p>
        </v-flex>
      </v-layout>

        <v-layout row wrap v-else>
          <v-flex>
            
            <div class="subheading pt-2">Jika ada tambahan, silakan &nbsp;<vue-xlsx-table @on-select-file="importPeserta">IMPORT</vue-xlsx-table> &nbsp;lagi.</div>
            <div class="subheading pa-0">Atau <button type="button" class="xlsx-button hps" @click="deleteAllPeserta">HAPUS</button> semua ({{ pesertas.length }}) peserta</div>
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
                <td class="text-xs-right">
                  <v-btn icon color="success"><v-icon>contact_mail</v-icon></v-btn>
                  <v-btn icon color="success"><v-icon>school</v-icon></v-btn>
                </td>
              </template>
            </v-data-table>            
          </v-flex>
        </div>
        
      </v-layout>
    </v-slide-y-transition>

    <Preview ref="preview" @reload="getPesertas"></Preview>

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
              { text: 'Wali', value: 'wali'},
              { text: 'Usia', sortable: false, value: 'usia_sekarang'},
              { text: 'Lembaga', value: 'tpq_imtas.tpq.nama'},
              { text: 'Aksi', class: 'text-xs-right', sortable: false},
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
        // console.log(event)
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
        // console.log(data)
        // this.axios.post('/peserta/import', {'data': data, 'kegiatan': this.kegiatan})
        // .then(response=>{
        //   console.log(response.data)
        // })
      },

      deleteAllPeserta(){
        this.$swal({
            title: "Yakin?",
            text: "Data tidak bisa dikembalikan lagi!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#85be39",
            cancelButtonColor: '#ef5350',
            confirmButtonText: "Yes!"
        })
        .then(func=>{
          if(func.value){
            let event = JSON.parse(localStorage.getItem('kegiatan'))
            this.axios.post('peserta/deleteall', {'id': event.id})
            .then(res=>{
              this.getPesertas()
              this.$swal({title:'Sukses', text:'Data berhasil dihapus', type:'success',timer:1800});
            })         
          }
        })
      },

    }

  }

</script>

<style scoped>
  .hps{
    background-color:#FF0000;
    border:1px solid #cc00;
  }
</style>


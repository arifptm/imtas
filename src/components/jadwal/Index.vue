<template>
  <v-container fluid grid-list-lg>
    
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs4 >
          <div v-for="jadwal,i in jadwals.list">
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

                <v-list-tile-action>
                  <v-btn icon ripple @click="removeJadwal(shift.id)">
                    <v-icon color="grey lighten-1">remove</v-icon>
                  </v-btn>
                </v-list-tile-action>                

              </v-list-tile>
            </v-list>
          </div>
        </v-flex>

        <v-flex xs8>
         
         <v-flex xs12 v-if="imtases.length == 0">
          <h1 class="headline primary--text"><p>Belum ada jadwal imtas.</p></h1>
          <p class="title">Silakan klik tanda + di samping untuk membuat jadwal!</p>
        </v-flex>

        <v-container v-else class="pa-0">
          <v-layout row wrap>
        <v-flex sm6 >
          <div class="subheading pt-0">{{ $moment(imtases[0].jadwal.tanggal).format('DD-MM-YYYY') }} | Shift #{{  imtases[0].jadwal.shift }} </div>
          <div class="subheading pt-0">Jumlah peserta {{ imtases.length }} santri</div>
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

  import Create from '@/components/jadwal/Create'

  export default{
    components:{Create},
    data(){
      return{
        cari:'',
        jadwals:{},
        imtases:[],
        headers: [
              { text: 'Nama santri', value: 'peserta.nama'},
              { text: 'Usia', sortable: false, value: 'peserta.usia_sekarang'},
              { text: 'Lembaga', value: 'tpq_imtas.tpq.nama'},
        ]
      }
    },

    created(){
      this.$root.pageTitle='Jadwal'

        let event = JSON.parse(localStorage.getItem('kegiatan'))        
        // console.log(event)
        if(event != null){
          this.getData()
        } else {
          this.$router.push({ path: '/kegiatan'})
          this.$swal('Ops','Pilih salah satu kegiatan dulu!', 'info')
        }              

      
    },

    methods:{
      getData(){
        this.getJadwals()
        this.getImtases()  
      },

      getJadwals(){
        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
        this.axios.post('api/jadwal', kegiatan)
        .then(res=>{
          //console.log(res.data)
          this.jadwals = res.data
          if(this.jadwals.count_peserta == 0 ){
              this.$router.push({ path: '/peserta'})
              this.$swal('Ops','Belum ada peserta, import peserta dulu!', 'info')
          }
        })
      },

      getImtases(jadwal){
        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
        this.axios.post('api/imtas/peserta', {'jadwal':jadwal, 'kegiatan': kegiatan})
        .then(res=>{
          // console.log(res.data)
          this.imtases = res.data
            // if (this.imtases.length == 0){
            //   this.$router.push({ path: '/peserta'})
            //   this.$swal('Ops','Belum ada peserta, import peserta dulu!', 'info')
            // }          
        })



      },

      openCreateDialog(id){
        let kegiatan = JSON.parse(localStorage.getItem('kegiatan'))
        this.$refs.create.tpqImtas.kegiatan_id = kegiatan.id
        this.$refs.create.tpqImtas.jadwal_id = id
        this.$refs.create.dialog=true
      },

      removeJadwal(id){
        this.$swal({
            title: "Yakin?",
            text: "Jadwal akan dibatalkan!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#85be39",
            cancelButtonColor: '#ef5350',
            confirmButtonText: "Yes!"
        })
        .then(func=>{
          if(func.value)
            this.axios.post('api/imtas/peserta/remove', {'id': id})
            .then(res=>{
              this.getData()
              this.$refs.create.getTpqImtases()
              this.$swal({title:'Sukses', text:'Jadwal berhasil dibatalkan.', type:'success',timer:1800});
            })         
        })

      }

    }
  }

</script>

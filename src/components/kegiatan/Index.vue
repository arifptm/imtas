<template>
  <v-container fluid grid-list-lg>
    
    <Menus></Menus>

    <v-slide-y-transition mode="out-in">
      <v-layout row wrap >
        <v-flex xs12>
          <h1 class="display-1 primary--text"><p>Daftar Kegiatan</p></h1>
        </v-flex>
        
        <!-- <v-flex xs12 v-if="items.data.length == 0">
          <p class="subheading">Tidak ada riwayat kegiatan. Silakan <a @click="createKegiatan">membuat kegiatan</a> baru!</p>
        </v-flex> -->

        <v-flex xs6 sm4 >
          <v-card dark height="150px">
            <v-card-text primary-title class="text-xs-center" @click="">
              <v-btn flat color="success" fab @click="createKegiatan">
                <v-icon color="yellow" x-large >add</v-icon>
              </v-btn>              
                <h3><b>TAMBAH KEGIATAN</b></h3>
            </v-card-text>            
          </v-card>
        </v-flex>

        <v-flex xs6 sm4 v-for="item,i in  items.data" :key="i" class="">
          <v-card height="150px">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Imtas <b>{{ $moment(item.periode).format('YYYY') }}</b></h3>
                <div>Cabang {{ item.cabang }}, {{ $moment(item.tanggal_imtas).locale('id').format('DD MMM YYYY') }}</div>
              </div>
            </v-card-title>
            <v-card-actions>              
              <v-btn flat color="blue" @click="selectKegiatan(item)">Pilih</v-btn><v-spacer></v-spacer>
              <v-btn flat color="blue" @click="editKegiatan(item,i)">Edit</v-btn><v-spacer></v-spacer>
              <v-btn flat color="red" @click="deleteKegiatan(item)"><v-icon>delete</v-icon></v-btn>
            </v-card-actions>            
          </v-card>
        </v-flex>
        
      </v-layout>        
    </v-slide-y-transition>

    <Create ref="create" @reload="getItems"></Create>

  </v-container>
</template>

<script>
  

  import Menus from '@/components/layout/Menus'
  
  import Create from '@/components/kegiatan/Create'

  export default{
    components:{Menus, Create},
    data(){
      return{
        items:[],
        item:{}
      }
    },

    created(){
      this.getItems()
      this.$root.pageTitle = 'I M T A S'
    },

    methods:{
      getItems(){
        this.axios.get('/kegiatan')
        .then(res=>{
          // console.log(res.data)
          this.items = res.data
        })
      },      

      createKegiatan(){
        this.$refs.create.dialog=true
      },

      editKegiatan(item,i){
        console.log(i)
        this.$refs.create.editedIndex = i
        this.$refs.create.dialog=true
        this.$refs.create.kegiatan = item
      },

      selectKegiatan(item){
        // console.log(item)     
        localStorage.setItem('kegiatan', JSON.stringify(item))   
        this.$router.push('/kegiatan/'+ item.id)
      },

      deleteKegiatan(item){
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
          if(func.value)
            this.axios.delete('/kegiatan/'+item.id)
            .then(res=>{
              this.getItems()
              localStorage.removeItem('kegiatan')
              this.$swal({title:'Sukses', text:'Data berhasil dihapus', type:'success',timer:1800});
            })         
        })
        
      },

    }


  }

</script>
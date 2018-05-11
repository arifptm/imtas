<template>
      <v-dialog v-model="dialog" max-width="560px" scrollable>
        <v-card>
          <v-card-title>
            <h3 class="headline mb-0">Tambah Kegiatan</h3>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            
            <v-select v-model="kegiatan.periode" label="Periode" :items="periodes" item-text="text" item-value="value"></v-select>

            <v-container grid-list-lg pa-0>                          
            <v-layout row wrap>
              <v-flex sm6>
                <v-menu :close-on-content-click="false" v-model="menu1"
                  :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px"
                >
                  <v-text-field readonly slot="activator"
                    v-model="tanggalImtasFormat" label="Tanggal mulai Imtas"                
                  ></v-text-field>
                  <v-date-picker v-model="kegiatan.tanggal_imtas" no-title @input="menu1 = false" locale="id"></v-date-picker>
                </v-menu>  
              </v-flex>

              <v-flex sm6>
                <v-menu :close-on-content-click="false" v-model="menu2"
                  :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px"
                >
                  <v-text-field readonly slot="activator"
                    v-model="tanggalSelesaiImtasFormat" label="Tanggal selesai Imtas"                
                  ></v-text-field>
                  <v-date-picker v-model="kegiatan.tanggal_selesai_imtas" no-title @input="menu2 = false" locale="id"></v-date-picker>
                </v-menu>  
              </v-flex>
              
              <v-flex sm6><v-text-field label="Cabang" v-model="kegiatan.cabang"></v-text-field></v-flex>
              <v-flex sm6><v-text-field label="Sekretariat" v-model="kegiatan.sekretariat"></v-text-field></v-flex>
              <v-flex sm6><v-text-field label="PJ. kegiatan" v-model="kegiatan.pj"></v-text-field></v-flex>
              <v-flex sm6><v-text-field label="Nomor kontak/HP" v-model="kegiatan.hotline"></v-text-field></v-flex>
              <v-flex sm6><v-text-field label="Infaq peserta lama" v-model="kegiatan.infaq_lama"></v-text-field></v-flex>
              <v-flex sm6><v-text-field label="Infaq peserta baru" v-model="kegiatan.infaq_baru"></v-text-field></v-flex>

            </v-layout>     
            </v-container> 

          </v-card-text>
           <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" @click.stop="saveKegiatan">Simpan</v-btn>
            <v-btn color="primary" flat @click.stop="dialog=false">Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

</template>
<script>
  
  


  export default{
  
    data(){
      return{
        editedIndex: -1,
        periodes:[],
        date: null,
        menu1: false,
        menu2: false,
        dialog:false,
        kegiatan:{},
      }
    },

    created(){
      let now = this.$moment().format('YYYY')      
      // console.log(Number(now) + 1)
      for(var i=0;i<6;i++){
        let next = Number(now)+i
        this.periodes.push({value: next+'-01-01', text: 'Tahun '+ next})
      }      
    },

    computed: {
      tanggalImtasFormat () {
        let dt = this.kegiatan.tanggal_imtas
        return dt ? this.$moment(dt).locale('id').format('dddd, DD MMM YYYY') : ''        
      },
      tanggalSelesaiImtasFormat () {
        let dt = this.kegiatan.tanggal_selesai_imtas
        return dt ? this.$moment(dt).locale('id').format('dddd, DD MMM YYYY') : ''        
      }
    },    

    methods:{
      periodeFormat(dt){
        return dt ? 'Tahun ' + this.$moment(dt).format('YYYY') : ''
      },

      saveKegiatan(){
        if(this.editedIndex == -1){ 
          this.axios.post('/kegiatan', this.kegiatan)
          .then(res=>{
            // console.log(res.data)
            this.$emit('reload')
            this.dialog= false
            this.$swal('Mantap')
          })
        } else {
          this.axios.put('/kegiatan/'+ this.kegiatan.id, this.kegiatan )
          .then(res=>{
            // console.log(res.data)
            this.$emit('reload')
            this.dialog= false
            this.$swal({title:'Sukses', text:'Data berhasil diperbarui', type:'success',timer:1800});
          })
        }
      }
    }

  }
</script>
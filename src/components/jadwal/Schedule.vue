<template>
  <v-dialog v-model="dialog" max-width="300px" scrollable>
    <v-card>
      <v-card-title>
        <h3 class="headline mb-0">Jumlah santri?</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        
        <v-select
          :items="items"
          v-model="jumlahImtasOption"
          label="Silakan pilih"
          persistent-hint
          hint="Jumlah yang akan dijadwalkan"
        ></v-select>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" @click.stop="scheduleIt">Simpan</v-btn>
        <v-btn color="primary" flat @click.stop="dialog=false">Batal</v-btn>
      </v-card-actions>      

    </v-card>
  </v-dialog>

</template>


<script>
  
  export default{

    props:['tpqImtas'],
  
    data(){
      return{
        dialog: false,        
        items:[],
        jumlahImtasOption: 0        
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods:{
      close () {
        this.dialog = false        
          this.jumlahImtasOption = 0
      },      
      scheduleIt(){
        this.axios.post('api/imtas', { 'tpqImtas': this.tpqImtas, 'jumlah': this.jumlahImtasOption})
        .then(res=>{
          this.close()
          this.$emit('close')
        })
      }
    },

  }

</script>

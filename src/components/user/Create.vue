<template>
  <v-dialog v-model="dialog" max-width="560px" scrollable>
    <v-card>
      <v-card-title>
        <h3 class="headline mb-0">Tambah Pengguna</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>

        <v-select v-model="kegiatan.periode" label="Periode" :items="periodes" item-text="text" item-value="value"></v-select>

        <v-flex sm6><v-text-field label="Nama" v-model="name"></v-text-field></v-flex>
        <v-flex sm6><v-text-field label="Materi" v-model="email"></v-text-field></v-flex>      
        <v-flex sm6><v-text-field label="Materi" v-model="password"></v-text-field></v-flex>      

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" @click.stop="save">Simpan</v-btn>
        <v-btn color="primary" flat @click.stop="dialog=false">Batal</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>

  export default{
    data(){
      return{
        dialog:false,
        name:'',
        email:'',
        password:''
      }
    },

    created(){      
      
    },

    computed: {
      
    },    

    methods:{
      save(){

      }
    }

  }
</script>
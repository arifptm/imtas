<template>
	<v-dialog v-model="dialog" full-width scrollable>
	    <v-card>
	      	<v-card-title>
	        	<h3 class="headline mb-0">Preview</h3>
	        	<v-spacer></v-spacer>
	        	<v-btn color="success" @click="importPeserta">Simpan</v-btn>
	        	<v-btn icon @click="dialog = false"><v-icon>clear</v-icon></v-btn>
	      	</v-card-title>
	      		      	<v-divider></v-divider>
	      	<v-card-text>
<v-progress-linear :indeterminate="true" v-if="loader === true"></v-progress-linear>
<v-data-table
    :headers="headers"
    :items="pesertas"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">      
      <td>{{ props.item.korcam_kecamatan }}</td>
      <td>{{ props.item.tpq_nama }}</td>
      <td>{{ props.item.tpq_alamat }}</td>
      <td>{{ props.item.santri_nama }}</td>
      <td>{{ props.item.santri_wali }}</td>      
      <td>{{ props.item.santri_tempat_lahir }}</td>      
      <td>{{ props.item.santri_tanggal_lahir }}</td>      
    </template>
  </v-data-table>	      		


	      	</v-card-text>
	      	<v-divider></v-divider>
	      	<v-card-actions>
	      		<v-btn flat color="success" @click="importPeserta">Simpan</v-btn>
	      		<v-btn flat color="success" @click="dialog = false">Batal</v-btn>
	      	</v-card-actions>
	    </v-card>
	</v-dialog>    
</template>


<script>
export default{
	


	data(){
		return{
			dialog: false,
			loader: false,
			pesertas:[],
			headers: [
	          { text: 'Korcam', sortable: false, value: 'korcam_kecamatan'},
	          { text: 'Lembaga', sortable: false, value: 'tpq_nama'},
	          { text: 'Alamat', sortable: false, value: 'tpq_alamat'},
	          { text: 'Nama santri', sortable: false, value: 'santri_nama'},
	          { text: 'Wali', sortable: false, value: 'santri_wali'},
	          { text: 'Tempat lahir', sortable: false, value: 'santri_tempat_lahir'},
	          { text: 'Tanggal lahir', sortable: false, value: 'santri_tanggal_lahir'},
	          
			]
		}
	},

	watch: {
      	pesertas(val){
      		this.dialog =true
      		// this.editedItem.kegiatan_id = val.id      		
      	}
    },


	methods:{

		importPeserta(){
        	this.loader = true
        	this.axios.post('api/peserta/import', {'data': this.pesertas, 'kegiatan': localStorage.getItem('kegiatan')})
        	
        	.then(response=>{
          		// console.log(response.data)
          		this.dialog = false
          		this.loader = false
          		this.$emit('reload')
        	})			
		}

	}
}
</script>


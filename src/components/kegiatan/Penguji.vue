<template>
	<v-dialog v-model="dialog" max-width="500px" scrollable>
	    <v-card>
	      	<v-card-title>
	        	<h3 class="headline mb-0">{{ dialogTitle }}</h3>
	      	</v-card-title>
	      		      	
	      	<v-card-text>
	      		<v-text-field label="Nama" v-model="editedItem.nama"></v-text-field>
	      		<v-text-field label="Materi" v-model="editedItem.materi"></v-text-field>
	      	</v-card-text>

	      	<v-card-actions>
	      		<v-btn flat color="success" @click="savePenguji">Simpan</v-btn>
	      		<v-btn flat color="success" @click="dialog = false">Batal</v-btn>
	      	</v-card-actions>
	    </v-card>
	</v-dialog>    
</template>


<script>
export default{
	
	props:['kegiatan'],

	data(){
		return{
			dialog: false,
			editedIndex: -1,						
			editedItem:{
				kegiatan_id: '',
				nama:'',
				materi:''
			},
			defaultItem:{
				kegiatan_id: '',
				nama:'',
				materi:''
			},
		}
	},

    computed: {
      dialogTitle () {
        return this.editedIndex === -1 ? 'Tambah Penguji' : 'Edit Penguji'
      }
    },

	watch: {
      	dialog (val) {
        	val || this.close()
      	},
      	
      	kegiatan(val){
      		this.editedItem.kegiatan_id = val.id
      		this.defaultItem.kegiatan_id = val.id
      	}
    },


	methods:{
      	
      	close () {
        	this.dialog = false
        	setTimeout(() => {
          		this.editedItem = Object.assign({}, this.defaultItem)
          		this.editedIndex = -1
        	}, 300)
      	},

		savePenguji(){	
			if(this.editedIndex > -1){
				this.axios.put('/penguji/'+this.editedItem.id, this.editedItem)
				.then(response=>{
					this.$emit('refresh')					
				})				
			} else {
				this.axios.post('/penguji', this.editedItem)
				.then(response=>{
					this.$emit('refresh')					
				})
			}

			this.close()

		},

		
	}
}
</script>


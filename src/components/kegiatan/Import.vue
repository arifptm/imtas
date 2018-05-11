











<template>
	<div :class="modalClass +' modal'">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Import Panitia</p>
				<button class="delete" aria-label="close" @click="hideModal"></button>
			</header>
			<section class="modal-card-body">
						<vue-xlsx-table @on-select-file="handleSelectedFile">Import</vue-xlsx-table>
			</section>
			<footer class="modal-card-foot">
				<button class="button is-success" @click="importPeserta">Simpan</button>
				<button class="button">Batal</button>
			</footer>
		</div>
		
	</div>


</template>

<script>

import Vue from 'vue'
import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {rABS: false})

export default{

	components:{},
	props:['kegiatan'],

	data(){
		return{
			editedIndex: -1,
			modalClass:'',
			panitia:{},
			pesertas:[]
		}
	},

	computed:{

	},

	methods:{

		showModal(){
			this.modalClass = 'is-active'
		},

		hideModal(){
			this.modalClass = ''
		},

		handleSelectedFile (convertedData) {
			let data = (convertedData.body)			
			axios.post('/api/peserta/import', {'data': data, 'kegiatan': this.kegiatan})
      		.then(response=>{
      			console.log(response.data)
      		})
    	},

		importPeserta(){	
			if(this.editedIndex == -1){						
				axios.post('/api/panitia', this.panitia)
				.then(response=>{
					this.$emit('refresh')					
					this.modalClass = ''
					this.panitia = {}
				})
			}
		}
	}
}
</script>
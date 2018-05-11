<template>
  <v-container fluid grid-list-lg>
    
    <Sidebar ref="sidebar"></Sidebar>
    <Navbar ref="navbar"></Navbar>

    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>                

        <v-flex md4>
        	<v-card>
        		<v-toolbar color="cyan" dark>
		          <v-toolbar-title>Data umum</v-toolbar-title>
		        </v-toolbar>

	        	<v-list>
					<v-list-tile>
		        	    <v-list-tile-content>
		        	      	<v-list-tile-title>Cabang</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ kegiatan.cabang }}</v-list-tile-action>
		        	</v-list-tile>
		        	        	  
		        	<v-list-tile>
		        	    <v-list-tile-content>
		        	      <v-list-tile-title>Tanggal mulai</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ $moment(kegiatan.tanggal_imtas).format('DD-MM-YYYY') }}</v-list-tile-action>
		        	</v-list-tile>
		        	
		        	<v-list-tile>
		        	    <v-list-tile-content>
		        	      <v-list-tile-title>Sekretariat</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ kegiatan.sekretariat }}</v-list-tile-action>
		        	</v-list-tile>

		        	<v-list-tile>
		        	    <v-list-tile-content>
		        	      <v-list-tile-title>PJ. Kegiatan</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ kegiatan.pj }}</v-list-tile-action>
		        	</v-list-tile>

		        	<v-list-tile>
		        	    <v-list-tile-content>
		        	      <v-list-tile-title>Nomor kontak/HP</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ kegiatan.hotline }}</v-list-tile-action>
		        	</v-list-tile>		        	
		        	
		        	<v-list-tile>
		        	    <v-list-tile-content>
		        	      <v-list-tile-title>Infaq peserta lama</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ numberFormat(kegiatan.infaq_lama) }}</v-list-tile-action>
		        	</v-list-tile>		        	

		        	<v-list-tile>
		        	    <v-list-tile-content>
		        	      <v-list-tile-title>Infaq peserta baru</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ numberFormat(kegiatan.infaq_baru) }}</v-list-tile-action>
		        	</v-list-tile>		        	
	        	</v-list>

	        </v-card>
          
        </v-flex>

        <v-flex md-4>
			<v-card>
        		<v-toolbar color="cyan" dark>
		          	<v-toolbar-title>Panitia</v-toolbar-title>
		          	<v-spacer></v-spacer>
					<v-btn light @click="createPanitia"><v-icon>add</v-icon> Tambah</v-btn>
		        </v-toolbar>

	        	<v-list>
					<v-list-tile v-for="panitia,i in kegiatan.panitias" :key="i">
		        	    <v-list-tile-content>
		        	      	<v-list-tile-title>{{ panitia.nama }}</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ panitia.jabatan }}</v-list-tile-action>
		        	    <v-list-tile-action>
		        	    	<v-menu left>
		        	      		<v-btn icon slot="activator"><v-icon color="blue">more_vert</v-icon></v-btn>
		        	      		<v-list>
		        	        		<v-list-tile @click="editPanitia(i)"><v-list-tile-avatar><v-icon>edit</v-icon></v-list-tile-avatar>
		        	        			<v-list-tile-title>Edit</v-list-tile-title></v-list-tile>
		        	        		<v-list-tile @click="deletePanitia(i)"><v-list-tile-avatar><v-icon>delete</v-icon></v-list-tile-avatar>
		        	        			<v-list-tile-title>Delete</v-list-tile-title></v-list-tile>
		        	      		</v-list>
		        	    	</v-menu>
		        		</v-list-tile-action>		        	    
		        	</v-list-tile>
	        	</v-list>
	        </v-card>  	
          
        </v-flex>

        <v-flex md-4>

			<v-card>
        		<v-toolbar color="cyan" dark>
		          	<v-toolbar-title>Penguji</v-toolbar-title>
		          	<v-spacer></v-spacer>
					<v-btn light @click="createPenguji"><v-icon>add</v-icon> Tambah</v-btn>
		        </v-toolbar>
	        	<v-list>
					<v-list-tile v-for="penguji,i in kegiatan.pengujis" :key="i">
		        	    <v-list-tile-content>
		        	      	<v-list-tile-title>{{ penguji.nama }}</v-list-tile-title>
		        	    </v-list-tile-content>
		        	    <v-list-tile-action>{{ penguji.materi }}</v-list-tile-action>
		        	    <v-list-tile-action>
		        	    	<v-menu left>
		        	      		<v-btn icon slot="activator"><v-icon color="blue">more_vert</v-icon></v-btn>
		        	      		<v-list>
		        	        		<v-list-tile @click="editPenguji(i)"><v-list-tile-avatar><v-icon>edit</v-icon></v-list-tile-avatar>
		        	        			<v-list-tile-title>Edit</v-list-tile-title></v-list-tile>
		        	        		<v-list-tile @click="deletePenguji(i)"><v-list-tile-avatar><v-icon>delete</v-icon></v-list-tile-avatar>
		        	        			<v-list-tile-title>Delete</v-list-tile-title></v-list-tile>
		        	      		</v-list>
		        	    	</v-menu>
		        		</v-list-tile-action>
		        	</v-list-tile>
	        	</v-list>

	        </v-card>

        </v-flex>

      </v-layout>
    </v-slide-y-transition>

    	<Panitia ref="panitia" :kegiatan="kegiatan" @refresh="getKegiatan"></Panitia>
		<Penguji ref="penguji" :kegiatan="kegiatan" @refresh="getKegiatan"></Penguji>
		

  </v-container>
</template>

<script>
  
  	import Sidebar from '@/components/layout/Sidebar'
  	import Navbar from '@/components/layout/Navbar'
  	import Panitia from '@/components/kegiatan/Panitia'
	import Penguji from '@/components/kegiatan/Penguji'
	import Import from '@/components/kegiatan/Import'

  	export default{
    
	    components:{Sidebar, Navbar, Panitia, Penguji, Import},
	    
	    data(){
	      	return{
	        	kegiatan: {}
	      	}
	  	},

		created(){
			this.getKegiatan()			
		},

		watch:{
			kegiatan(){
				this.$root.pageTitle = 'Imtas ' + this.kegiatan.cabang + ' ' + this.$moment(this.kegiatan.periode).format('YYYY')			
			}
		},

		methods:{
			getKegiatan(){
				this.axios.get('/kegiatan/'+ this.$route.params.id)
				.then(response=>{
					this.kegiatan = response.data
				})
			},

			numberFormat(val){
	      		let value = new Intl.NumberFormat('id-ID',{
	        	minimumFractionDigits: 0}).format(val)
	      		return value
	    	},

			createPanitia(){
				this.$refs.panitia.dialog = true
			},

			editPanitia(i){
				let item = this.kegiatan.panitias[i]
				this.$refs.panitia.editedIndex = i
				this.$refs.panitia.editedItem = item
				this.$refs.panitia.dialog = true
			},

			deletePanitia(i){
				let item = this.kegiatan.panitias[i]
			 	this.$swal({
		            title: "Apakah anda yakin?",
		            text: "Data tidak bisa dikembalikan!",
		            type: "warning",
		            showCancelButton: true,
		            confirmButtonColor: "#85be39",
		            cancelButtonColor: '#ef5350',
		            confirmButtonText: "Yes!"
		        })
		        .then(func=>{
		          	if(func.value){
		            	this.axios.delete('/panitia/'+item.id)
		            	.then(res=>{
		              		this.getKegiatan()
		              		this.$swal({title:'Sukses', text:'Data berhasil dihapus', type:'success',timer:1800});
		            	})         
		            }
		        })
			},

			createPenguji(){
				this.$refs.penguji.dialog = true	
			},

			editPenguji(i){
				let item = this.kegiatan.pengujis[i]
				this.$refs.penguji.editedIndex = i
				this.$refs.penguji.editedItem = item
				this.$refs.penguji.dialog = true
			},

			deletePenguji(i){
				let item = this.kegiatan.pengujis[i]
			 	this.$swal({
		            title: "Apakah anda yakin?",
		            text: "Data tidak bisa dikembalikan!",
		            type: "warning",
		            showCancelButton: true,
		            confirmButtonColor: "#85be39",
		            cancelButtonColor: '#ef5350',
		            confirmButtonText: "Yes!"
		        })
		        .then(func=>{
		          	if(func.value){
		            	this.axios.delete('/penguji/'+item.id)
		            	.then(res=>{
		              		this.getKegiatan()
		              		this.$swal({title:'Sukses', text:'Data berhasil dihapus', type:'success',timer:1800});
		            	})         
		            }
		        })
			},

			importPeserta(){
				this.$refs.import.showModal()
			}
		}      
    }
  

</script>
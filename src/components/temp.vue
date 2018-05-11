<template>
  <v-container fluid grid-list-lg>
    
    <Sidebar ref="sidebar"></Sidebar>
    <Navbar ref="navbar"></Navbar>

    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="display-1 primary--text"><p>Daftar Kegiatan</p></h1>
        </v-flex>
        
        
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  
  import Sidebar from '@/components/layout/Sidebar'
  import Navbar from '@/components/layout/Navbar'

  export default{
    components:{Sidebar, Navbar},
    data(){
      return{
        
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

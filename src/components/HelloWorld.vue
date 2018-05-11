<template>
  <v-container fluid>
    
    <Sidebar ref="sidebar"></Sidebar>
    <Navbar ref="navbar"></Navbar>

    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        {{ $store.state.drawer }} 
        
      </v-layout>
        }
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

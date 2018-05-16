<template>
  <v-container fluid>
    
    <Menus></Menus>

    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        OK        
      </v-layout>      
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  
  import Menus from '@/components/layout/Menus'

  export default{
    components:{Menus},
    data(){
      return{
        
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

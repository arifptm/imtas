<template>  
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex>
        <v-card>          
          <v-card-text>
            <v-data-table
              headers="headers"
              items="items"
              hide-actions
              class="elevation-1"
              select-all
              pagination.sync="pagination"
              item-key="id"
              loading="true"
              search="search"
            >
              
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block round depressed color="blue" dark @click="save">Simpan</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>

      <Create ref="create"></Create>

    </v-layout>
  </v-container>
  
</template>

<script>

  import Create from '@/components/user/Create'
  
  export default {
    components:{Create},
    data() {
      return {
        name: user1,
        email: 'user1@im.tas',
        password: '123456'
      }
    },

    methods: {
      register(){       
        this.axios.post('/oauth/token', data)
        .then( response => {            
          localStorage.setItem('token', response.data.access_token)
          localStorage.setItem('expiration', response.data.expires_in + Date.now())
          this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now())   
          this.$router.push('/')
        })
      }
    }
  }
</script>
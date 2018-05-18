<template>  
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 >
        <v-card>
          <v-toolbar flat dense dark color="blue">
            <v-toolbar-title>Pendaftaran</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" label="Nama" type="text" v-model="name"></v-text-field>
              <v-text-field prepend-icon="mail" label="Email" type="text" v-model="email"></v-text-field>
              <v-text-field prepend-icon="lock"  label="Password" type="password" v-model="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block round depressed color="blue" dark @click="register">Daftar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
  export default {
    data() {
      return {
        name: user1,
        email: 'user1@im.tas',
        password: '123456'
      }
    }),

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
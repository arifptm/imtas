<template>
  
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 >
            <v-card>
              <v-toolbar flat dense dark color="blue">
                <v-toolbar-title>Login IMTAS</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-show="false" prepend-icon="person" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock"  label="Password" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block round depressed color="blue" dark @click="login">Login</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  
</template>

<script>
  export default {
    data (){
      
      return {
        user:{},
        email: '',
        password: ''
      } 
    },   

    created(){
      let name = this.$route.params.abbr
      console.log(name)
      this.getUsername(name)
    }, 

    methods: {
      getUsername(name){
        this.axios.post('api/user', {name} )
        .then(res=>{
          this.email = res.data.email
        })
      },

      login(){
        var data = {
          client_id: 2,
          client_secret: 'CeaxDdVxUNkpyGNeU2a4GOqG2ZPheWdpehXb9vxe',          
          grant_type:'password',
          username: this.email,
          password: this.password
        }

        this.axios.post('oauth/token', data)
        .then( response => {            
          localStorage.setItem('token', response.data.access_token)
          localStorage.setItem('expiration', response.data.expires_in + Date.now())
           this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now())   
           this.$router.go('/')
        })
      } 
    }
  }
</script>
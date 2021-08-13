<template>
  <div class="wrapper">
    <div id="formContent">
      <h2>Login</h2><br>
      <span>You have been signed out</span>
      <input type="text" v-model="loginId" placeholder="ID"/>
      <input type="text" v-model="loginPassword" placeholder="PW"/>
      <input type="submit" value="Log In" v-on:click="Login()">
    </div>
  </div>
</template>

<script>

export default {
  name: "Logout",
  data: function(){
    return {
      loginId: '',
      loginPassword: ''
    }
  },
  methods:{
    Login: function(){


    }
  }
}
</script>



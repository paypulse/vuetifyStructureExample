<template>
  <div class="wrapper">
    <div id="formContent">
      <h2>Login</h2>
      <input type="text" v-model="loginId" placeholder="ID"/>
      <input type="text" v-model="loginPassword" placeholder="PW"/>
      <input type="submit" value="Log In" v-on:click="Login()">
    </div>
  </div>
</template>
<script>
export default {
 name: 'LoginView',
 data : function(){
   return {
     loginId: '',
     loginPassword: ''
   }
 },
 methods: {
   Login : function(){
     // 쿠키와 세션 처리
     console.log(this.loginId);
     console.log(this.loginPassword);




     this.$router.push("/board");

   }
 }
}
</script>

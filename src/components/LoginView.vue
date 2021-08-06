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

import axios from "axios";

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
     // 쿠키와 세션 처리 필요
     console.log(this.loginId);
     console.log(this.loginPassword);
     this.login();

    // this.$router.push("/board");

   },
   login : function(){
     axios.post(process.env.VUE_APP_SERVER_URL+"/login",{"id" : this.loginId, "pw": this.loginPassword}).then(res =>{
       console.log(res);

        if(res.data.data.loginYN === 1){
          //this.$router.push("/board");
          this.$router.push({name: 'Board', query: { userNm: res.data.data.userInfo.userNm , userCd: res.data.data.userInfo.userCd } });

        }else{
          alert(res.data.msg);
        }

     }).catch(err =>{
       console.log(err);
     });
   }
 }
}
</script>

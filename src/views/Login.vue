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
  name: "Login",
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
      this.loginCheck();

      // this.$router.push("/board");

    },
    loginCheck: function(){

      console.log('token check :',this.$store.state.token);


      axios.post(process.env.VUE_APP_SERVER_URL+"/login",{"id" : this.loginId, "pw": this.loginPassword}).then(res =>{
        console.log("login check :",res);

        if(res.data.processCnt === 1){
          this.$router.push("/board");
          //this.$router.push({name: 'Board', query: { userNm: res.data.data.userInfo.userNm , userCd: res.data.data.userInfo.userCd } });
          //this.$store.state.userNm = res.data.data.userNm;
          //this.$store.state.userCd = res.data.data.userCd;
          sessionStorage.setItem('userNm',res.data.data.userNm );
          sessionStorage.setItem('userCd',res.data.data.userCd);

          //token에 해당 되는것만 하기
          //this.$store.storage.setItem('token', res.headers.jwtauthtoken);
          //this.$store.state.token = res.headers.jwtauthtoken;
          sessionStorage.setItem('token',res.headers.jwtauthtoken);


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

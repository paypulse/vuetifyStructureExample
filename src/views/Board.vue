<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <!--- Header --->
      <Header @setInput="setInput"></Header>
      <!---Menu -->
      <Menu @menuItem="setMenu" v-if="value"></Menu>
      <!--- contents -->
      <v-main  class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
        <!---menu --->
<!--        <customer-view v-if="menu === 'CustomerView' || menu === ''"></customer-view>-->
        <error-log-view v-if="menu === 'ErrorLogView' || menu === ''"></error-log-view>
        <MenuSetting v-if="menu === 'MenuSetting'"></MenuSetting>
        <TestPage v-if="menu=== 'TestPage'"></TestPage>

                <!---- 추후 메뉴 설정 기능 추가시  -->
        <!-- 로그인시 첫 화면 설정 -->
<!--        <customer-view v-if="menu === 'CustomerView' || menu === ''"></customer-view>-->
<!--        <keep-alive>-->
<!--          <component v-bind:is =menu> </component>-->
<!--        </keep-alive>-->

      </v-main>
      <Footer></Footer>

    </v-app>
  </v-app>
</template>
<script>
import Vue from 'vue';
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import ErrorLogView from "@/components/customer/ErrorLogView";
import MenuSetting from "@/components/customer/MenuSetting";
import TestPage from "@/components/customer/TestPage";

export default{
  name: "Board",
  components: {TestPage, MenuSetting,ErrorLogView, Menu, Footer,Header},
  data : () =>({
    value :"",
    menu: ""
  }),
  mounted() {

  },
  created() {
    var eventBus = new Vue();
    eventBus.$on('drawer',function(data){
      console.log(data);
    });


  },
  methods:{
    setInput(value){
      this.value = value;
    },
    setMenu(value){
      this.menu = value;

    }
  }

};
</script>

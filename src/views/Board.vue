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
        <customer-view v-if="menu === 'CustomerView' || menu === ''"></customer-view>

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
import CustomerView from "@/components/customer/CustomerView";
export default{
  name: "Board",
  components: {CustomerView, Menu, Footer,Header},
  data : () =>({
    value :"",
    menu: ""
  }),
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

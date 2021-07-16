<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <!--- Header --->
      <Header @setInput="setInput"></Header>
      <!---Menu -->
      <Menu v-if="value"></Menu>
      <!--- contents -->
      <v-main  class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
        <Contents></Contents>
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
import Contents from "@/components/Content";
export default{
  name: "Board",
  components: {Contents,Menu, Footer,Header},
  data : () =>({
    value :""
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
    }
  }

};
</script>

<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <!--- Header --->
      <Header @setInput="setInput"></Header>
      <!---Menu -->
      <Menu v-if="value"></Menu>


      <!--- contents -->
      <v-main>
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
      console.log("자식 컴포넌트에게 값을 받았어요 : ", this.value);
    }
  }

};
</script>

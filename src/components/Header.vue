<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="indigo" dark>
<!--    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
  <v-app-bar-nav-icon  v-on:click="stop()"></v-app-bar-nav-icon>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">DEEP STUDY</span>
    </v-toolbar-title>
  </v-app-bar>
</template>
<script>

export default{
  name:"Header",
  data:() => ({
    drawer: false
  }),
  methods:{
    stop:function (){
       if(this.drawer === false){
         this.drawer = true;
       }else{
         this.drawer = false;
       }

      this.$emit("setInput", this.drawer);

    }
  }
};
</script>



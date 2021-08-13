<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  updated: function(){
    //browser 뒤로 가기 막기
    //history.forward(0);

    //token이 없으면 넘기지 않는다.


  }
};
</script>

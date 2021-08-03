<template>
    <v-container>
      <v-row no-gutters style="position: relative; left: 100px;">
        <h1>File upload</h1>
      </v-row>
      <v-row>
        <v-btn @click="selectUploadFile"> 이미지 선택  </v-btn>
        <span>결과 </span>
      </v-row>

    </v-container>

</template>

<script>
export default {
  name: "TestPage",
  data : () =>({
    file : File
  }),
  created() {

  },
  updated() {

  },
  methods :{
    selectUploadFile: function(){
       

    }
  }
}
</script>



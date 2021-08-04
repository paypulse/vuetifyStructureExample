<template>
    <v-container>
      <v-row no-gutters style="position: relative; left: 100px;">
        <h1>File upload</h1>
      </v-row>
      <v-row>
        <v-file-input type="file" @change="selectUploadFile">파일 선택 </v-file-input>
      </v-row>


    </v-container>

</template>

<script>
import axios from "axios";

export default {
  name: "TestPage",
  data : () =>({
    file : '',
    formData: null
  }),
  created() {

  },
  updated() {

  },
  methods :{
    selectUploadFile: function(e){
      console.log(e);
      this.formData = new FormData();
      this.formData.append("file", e);

      console.log(this.formData);
      axios.post("",);





    }
  }
}
</script>



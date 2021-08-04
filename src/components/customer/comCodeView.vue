<template>
  <v-container class="grey lighten-5" >
    <v-row no-gutters style="position: relative; left: 100px;">
      <h1>공통 코드 관리</h1>
    </v-row>


    <v-row style="position: relative; left:10px;">
      <v-data-table height="500px"
                    width="1000px" :headers="headers" :items="comCodeList" class="elevation-1">
        <!---- Grid list Row button 추가  --->
        <template v-slot:item.altBtn="{ item }">
          <v-btn @click="editItem(item)">수정</v-btn>
        </template>
        <template v-slot:item.delteBtn="{ item }">
          <v-btn @click="deleteItem(item)">삭제</v-btn>
        </template>

      </v-data-table>


    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
  name: "comCodeView",
  data: () => ({
    headers: [
      {text : '공통 코드'      , value:'mainCode'   , width: "100px", align :'center' , sortable: true},
      {text : '하위 코드'   , value:'subCode'    , width: "90px", align :'center' , sortable: true},
      {text : '하위 코드명' , value:'subCodeNm'  , width: "200px", align :'center' , sortable: true},
      {text : '생성자 명', value:'createdBy', width: "100px", align :'center' , sortable: true},
      {text : '생성 일시', value:'createdAt', width: "200px", align :'center' , sortable: true},
      {text : '수정자 명', value:'updatedBy', width: "100px", align :'center' , sortable: true},
      {text : '수정 일시', value:'updatedAt', width: "200px", align :'center' , sortable: true},
      {text : '수정 버튼', value:'altBtn', width: "50px", align :'center' , sortable: true },
      {text : '삭제 버튼', value:'delteBtn', width: "100px", align :'center' , sortable: true }
    ],
    selected: [],
    comCodeList: []
  }),
  created() {
    this.initData();
  },
  methods : {
    initData:  function(){

      axios.get(process.env.VUE_APP_SERVER_URL+":"+process.env.VUE_APP_SERVER_PORT+"/selectComCode").then(res => {
        console.log(res);
        this.comCodeList = res.data.data;

      }).catch(err => {
        console.log(err);
      });

    },
    editItem: function(item){
      console.log("test");
      console.log(item);
    },
    deleteItem: function(item){
      console.log(item);
    }
  }
}
</script>

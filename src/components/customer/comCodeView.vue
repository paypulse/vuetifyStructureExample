<template>
  <v-container class="grey lighten-5" >
    <v-row no-gutters style="position: relative; left: 100px;">
      <h1>공통 코드 관리</h1>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-btn  style="position: relative; left:90%;" color="primary" dark   @click="createItem" >등록</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table height="500px" :headers="headers" :items="comCodeList" class="elevation-20">
          <!---- Grid list Row button 추가  --->
          <template v-slot:item.altBtn="{ item }">
            <v-btn @click="editItem(item)">수정</v-btn>
          </template>
          <template v-slot:item.delteBtn="{ item }">
            <v-btn @click="deleteItem(item)">삭제</v-btn>
          </template>
        </v-data-table>
      </v-col>

    </v-row>

  <!-----팝업 화면 ------>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title style="background-color: #3f51b5;">
          <span class="headline" style="color:#f6f6f6;">{{ dialogTitle }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row style="position:relative; top: 30px;" v-if="dialFlag === 0">
              <v-col cols=2 sm="3">
                <span>공통 코드 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field label="공통 코드" v-model="mainCode" required></v-text-field>
              </v-col>
              <!--- 추후 다시 생각하기  --->
<!--              <v-col style="position: relative; top:-10px;">-->
<!--                <v-btn v-on:click="doubleCheck">중복 체크</v-btn>-->
<!--              </v-col>-->
            </v-row>
            <v-row style="position:relative; top: 30px;" v-if="dialFlag === 1">
              <v-col cols=2 sm="3">
                <span>공통 코드 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field  v-model="mainCode" value="mainCode" disabled></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="dialFlag === 0" >
              <v-col cols=2 sm="3">
                <span>공통 코드 명 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field  v-model="mainCodeNm" required ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="dialFlag === 1" >
              <v-col cols=2 sm="3">
                <span>공통 코드 명 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field  v-model="mainCodeNm" value="mainCodeNm" required ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="dialFlag === 0">
              <v-col cols=2 sm="3">
                <span>하위 코드 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field label="하위 코드" v-model="subCode" required></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="dialFlag === 1">
              <v-col cols=2 sm="3">
                <span>하위 코드 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field v-model="subCode" value="subCode" disabled></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="dialFlag === 0">
              <v-col cols=2 sm="3">
                <span>하위 코드 명 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field label="하위 코드 명" v-model="subCodeNm" required></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="dialFlag === 1">
              <v-col cols=2 sm="3">
                <span>하위 코드 명 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field v-model="subCodeNm" value="subCodeNm" required></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols=2 sm="3">
                <span>우선 순위 </span>
              </v-col>
              <v-col style="position: relative; top:-30px;">
                <v-text-field v-model="sort" value="sort" required></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols=2 sm="3">
                <span>사용 여부 </span>
              </v-col>
              <v-col style="position: relative; top:-20px;">
                <v-radio-group row v-model="useYn">
                  <v-radio label="Y" value="Y"></v-radio>
                  <v-radio label="N" value="N"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions v-if="dialFlag === 0">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">닫기</v-btn>
          <v-btn color="blue darken-1" text @click="saveAllItem">등록</v-btn>
        </v-card-actions>
        <v-card-actions v-if="dialFlag === 1">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">닫기</v-btn>
          <v-btn color="blue darken-1" text @click="alterItem">수정</v-btn>
        </v-card-actions>


      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
import axios from "axios";

export default {
  name: "comCodeView",
  data: () => ({
    headers: [
      {text : 'No.'      , value:'rnum'   , width: "100px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '공통 코드'  , value:'mainCode'   , width: "100px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '공통 코드 명', value:'mainCdNm'    , width: "100px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '하위 코드'  , value:'subCode'    , width: "100px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '하위 코드명', value:'subCodeNm'  , width: "150px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '우선 순위' , value:'sort'      , width: "80px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '사용 여부', value:'useYn'     , width: "100px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '생성자 명', value:'createdBy', width: "100px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '생성 일시', value:'createdAt', width: "150px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '수정자 명', value:'updatedBy', width: "100px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '수정 일시', value:'updatedAt', width: "150px", align :'center' , sortable: true, class: "primary white--text"},
      {text : '수정 버튼', value:'altBtn', width: "80px", align :'center' , sortable: true, class: "primary white--text" },
      {text : '삭제 버튼', value:'delteBtn', width: "80px", align :'center' , sortable: true, class: "primary white--text" }
    ],
    selected: [],
    comCodeList: [],
    dialog: false,
    dialogTitle:'',
    dialFlag:0,
    mainCode:'',
    mainCodeNm:'',
    subCode:'',
    subCodeNm:'',
    useYn: 'Y',
    sort:1,
    userId: '',
    userName: ''
  }),
  created() {
    this.initData();
  },
  methods : {
    initData:  function(){

      // 공통 코드 관리 list data setting
      axios.get(process.env.VUE_APP_SERVER_URL+"/selectComCode").then(res => {
        console.log(res);
        this.comCodeList = res.data.data;

      }).catch(err => {
        console.log(err);
      });

      //userId/name setting
      this.userId = this.$route.query.userCd;
      this.userName = this.$route.query.userNm;


    },
    createItem: function(){
      // form data 초기화
      if(this.subCodeNm !== null){
        this.initValue();
      }
      this.dialFlag = 0;
      this.dialog = true;
      this.dialogTitle="공통 코드 등록";

    },
    editItem: function(item){
      console.log("test");
      console.log(item);
      this.dialFlag = 1;
      this.dialog = true;
      this.dialogTitle= "공통 코드 수정";
      this.mainCode = item.mainCode;
      this.mainCodeNm = item.mainCdNm;
      this.subCode = item.subCode;
      this.subCodeNm = item.subCodeNm;
      this.useYn = item.useYn;
      this.sort = item.sort;

    },
    deleteItem: function(item){
      console.log(item);
      var param  = new URLSearchParams();
      param.append('mainCode', item.mainCode);
      param.append('subCode', item.subCode);

      axios.post(process.env.VUE_APP_SERVER_URL+"/deleteComCode",param)
      .then(res => {
        alert(res.data.msg);
        this.dialog = false;
        this.initData();
      }).catch(err =>{
         alert(err);
      });





    },
    doubleCheck: function(){
      console.log(this.mainCode);
      axios.get(process.env.VUE_APP_SERVER_URL+"/selectCheckMainCd?mainCode="+this.mainCode)
      .then(res => {
        alert(res.data.msg);

      }).catch(err => {
        alert(err);
      });


    },
    initValue: function(){
      this.mainCode = null;
      this.mainCodeNm = null;
      this.subCode = null;
      this.subCodeNm = null;
      this.useYn = 'Y';
      this.sort = 1;

    },
    saveAllItem: function(){
      let param = {"userId": this.userId, "userName": this.userName,
                    "mainCode":this.mainCode, "mainCdNm": this.mainCodeNm,
                    "subCode":this.subCode, "subCodeNm":this.subCodeNm,
                    "useYn":this.useYn, "sort": this.sort};

      axios.post(process.env.VUE_APP_SERVER_URL+"/insertComCode",param)
      .then(res => {
        alert(res.data.msg);
        this.dialog = false;
        this.initData();

      }).catch(err =>{
        alert(err);
      });



    },
    alterItem: function(){
      let param = {"userId": this.userId, "userName": this.userName,
        "mainCode":this.mainCode, "mainCdNm": this.mainCodeNm,
        "subCode":this.subCode, "subCodeNm":this.subCodeNm,
        "useYn":this.useYn, "sort": this.sort};
      axios.post(process.env.VUE_APP_SERVER_URL+"/updateComCode",param)
      .then(res => {
            alert(res.data.msg);
            this.dialog = false;
            this.initData();

      }).catch(err =>{
         alert(err);
      });
    }

  }
}
</script>

<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters style="position: relative; left: 100px;">
      <h1> 회원 관리</h1>
    </v-row>


    <v-row no-gutters >
      <v-col cols="1">
        <v-subheader style="position: relative; top:30%">상품</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-select style="position: relative; top:10%" label="상품" v-model="goodsSelected"  :items="goodsSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>

      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-subheader style="position: relative; top:30%">학습 상태</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-select style="position: relative; top:10%" label="학습 상태" v-model="onlineSelected" :items="onlineSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
      </v-col>

    </v-row>
    <!----  등록일 date picker ---->
    <v-row>
      <v-col cols="1">
        <v-subheader style="position: relative; top:20%">등록일</v-subheader>
      </v-col>

      <!---- start date ---->
      <v-col cols="10" lg="2" md="4">
        <v-menu
            ref="sDMenu"
            v-model="sDMenu"
            :close-on-content-click="false"
            :return-value.sync="startDate"
            transition="scale-transition"
            offset-y
            min-width="290px">
          <template v-slot:activator="{on, attrs}">
            <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="sDMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.sDMenu.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <!----- End date ----->
      <v-col cols="10" lg="2" md="4">
        <v-menu
            ref="eDMenu"
            v-model="eDMenu"
            :close-on-content-click="false"
            :return-value.sync="endDate"
            transition="scale-transition"
            offset-y
            min-width="290px">
          <template v-slot:activator="{on, attrs}">
            <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="endDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="eDMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.eDMenu.save(endDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="7">
        <v-btn style="position: relative; top:20%;">오늘</v-btn>
        <v-btn style="position: relative; top:20%; left: 2%">7일</v-btn>
        <v-btn style="position: relative; top:20%; left: 4%">15일</v-btn>
        <v-btn style="position: relative; top:20%; left: 6%">30일</v-btn>
        <v-btn style="position: relative; top:20%; left: 8%">60일</v-btn>
        <v-btn style="position: relative; top:20%; left: 10%">1년</v-btn>
      </v-col>
    </v-row>
      <!----- search bar---->
    <v-row no-gutters>
      <v-col cols="1">
        <v-subheader style="position: relative; top:20%">검색유형</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-select v-model="onlineSelected" :items="searchSelectBox" item-value='cd' item-text="cdNm" return-object single-line></v-select>
      </v-col>

      <v-col cols="1" md="2" lg="3">
        <v-text-field ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <!--- 검색 버튼 --->
      <v-col cols="12" >
        <v-btn style="position: relative; left:87%; bottom: 20%" color="primary" v-on:click="selectReset">초기화</v-btn>
        <v-btn style="position: relative; left:88%; bottom: 20%" color="primary" v-on:click="selectList">조회</v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>


    <!----Grid List ---->
    <v-row >
      <v-col style="position: absolute; top:40%; width: 92%; left:3%">
        <v-data-table height="450px"
                      :headers="headers"
                      :items="customerGridList"
                      class="elevation-20"
                      dense>
          <template v-slot:item.detailItem="{ item }">
            <v-btn @click="detailItem(item)">보기</v-btn>
          </template>
        </v-data-table>

        <v-pagination
            v-model="page"
            :length="pageLength"
        ></v-pagination>
      </v-col>
    </v-row>


  </v-container>



</template>

<script>
import axios from "axios";

export default {
  name: "CustomerView",
  data: () =>({
    //온라인 학습 상태
    onlineSelected: {},
    onlineSelectBox: [],
    //상품
    goodsSelected: {},
    goodsSelectBox: [],


    /*검색 유형*/
    searchSelected: '',
    searchSelectBox: [
      {cd: 10, cdNm:"계약자명"},
      {cd: 20, cdNm:"휴대전화번호코드"},
      {cd: 30, cdNm:"CRM 계약코드"},
      {cd: 40, cdNm:"로그인ID"}],
    /*row count 갯수*/
    rowCountSelected: '',
    rowCountSelectBox : [
      {cd: 5,  cdNm:"5개씩"},
      {cd: 10, cdNm:"10개씩"},
      {cd: 15, cdNm:"15개씩"},

    ],
    /* date picker */
    sDMenu : false,
    eDMenu : false,
    startDate :  new Date().toISOString().substr(0,10),
    endDate: new Date().toISOString().substr(0,10),
    iconfont: 'fa',
    icons: {iconfont: 'md'},
    /* Grid List */
    headers:[
      { text: '회원 번호' ,value: 'custCd'  ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '회원  명'  ,value: 'userNm'  ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '자녀  명'  ,value: 'childNm' ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '학습앱 ID' ,value: 'fCid'    ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '부모앱 ID' ,value: 'fPid'    ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '상품 명'   ,value: 'goodNm'  ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '학습 상태'  ,value: 'stuStat' ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '회원 등록일',value: 'createAt' ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"},
      { text: '관리'      ,value: 'detailItem' ,width: "90px"  ,align:'center', sortable: true, class: "primary white--text"}
    ],

    customerGridList: [],
    pageLength: 5,
    page: 1,

    customerSelected: [],
    valid: false
  }),
  mounted() {
    //select box init
    this.selectBoxInit();

    //select grid List
    this.selectGridInit();

  },
  created() {

  },
  methods:{
    selectBoxInit: function(){
      axios.post(process.env.VUE_APP_SERVER_URL+"/userInfo/selectBox",
          '',{headers: {"jwtAuthToken": this.$store.state.token }} )
      .then(res=>{
        console.log("res : ",res);
        this.goodsSelectBox = res.data.data.goods;
        this.onlineSelectBox = res.data.data.onlineStudy;


      }).catch(err =>{
        console.log(err);
      });

    },
    selectGridInit: function(){
      axios.post(process.env.VUE_APP_SERVER_URL+ "/userInfo/userInfoGridList",
      '', {headers: {"jwtAuthToken": this.$store.state.token }} )
      .then(res =>{
        console.log(res);
        this.customerGridList = res.data.data;

      }).catch(err =>{
        console.log(err);
      });
    },
    selectReset: function(){
      console.log("reset");
    },

    selectList: function(){
      console.log("select");
    },
    detailItem: function(item){
       console.log("datail");
       console.log("item : ", item);


    }

  }
}
</script>


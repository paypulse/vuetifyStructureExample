<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters style="position: relative; left: 100px;">
      <h1> 회원 관리</h1>
    </v-row>


    <v-row no-gutters>
      <v-col cols="1">
        <v-subheader style="position: relative; top:30%">상품</v-subheader>
      </v-col>
      <v-col  cols="2">
        <v-select style="position: relative; top:10%" v-model="goodsSelected" :items="goodsSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-subheader style="position: relative; top:30%">학습 상태</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-select style="position: relative; top:10%" v-model="goodsSelected" :items="goodsSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
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

    <v-divider></v-divider>

    <v-row no-gutters>
      <!--- 검색 버튼 --->
      <v-col cols="12" >
        <v-btn style="position: relative; left:90%; top: 30%" color="primary">초기화</v-btn>
        <v-btn style="position: relative; left:91%; top: 30%" color="primary">조회</v-btn>
      </v-col>

    </v-row>

    <v-row no-gutters>
      <v-col cols="1">
        <v-select style="position: relative; top:10%;left:1100%;" v-model="onlineSelected" :items="searchSelectBox" item-value='cd' item-text="cdNm" return-object single-line></v-select>
      </v-col>

    </v-row>



    <!----Grid List ---->
    <v-row >
      <v-col>
        <v-data-table height="250px"
                      width="1000px"
                      :headers="headers"
                      v-model="customerSelected"
                      :items="customerGridList"
                      item-key="id"
                      class="elevation-1"
                      hide-default-footer
                      dense>
        </v-data-table>
        <v-pagination
            v-model="customerSelected"
            :length="6"
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
    areaSelected: '',
    areaSelectBox:[],
    onlineSelected: '',
    onlineSelectBox: [],
    visitSelected:'',
    visitSelectBox: [],
    goodsSelected: '',
    goodsSelectBox: [],
    paymentSelected:'',
    paymentSelectBox:[],

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

      { text: '회원 번호' ,value: 'center',   width: "90px" },
      { text: '회원 명' ,  align: 'center', value: 'fat',width: "90px"  },
      { text: '자녀 명', value: 'carbs',width: "90px"  },
      { text: '학습앱 ID', value: 'iron',width: "90px" },
      { text: '부모앱 ID', value: 'iron',width: "90px" },
      { text: '상품명', value: 'iron',width: "90px" },
      { text: '학습 상태', value: 'iron',width: "90px" },
      { text: '회원 등록일', value: 'iron',width: "90px" },
      { text: '관리', value: 'iron',width: "90px" }


    ],
    customerGridList: [],
    customerSelected: [],
    valid: false
  }),
  mounted() {
    //select box init
    this.selectBoxInit();

    //Grid list init


  },
  created() {

  },
  methods:{
    selectBoxInit: function(){
      axios.post(process.env.VUE_APP_SERVER_URL+":"+process.env.VUE_APP_SERVER_PORT+"/userInfo/selectBox").then(res=>{
        console.log(res);
        this.areaSelectBox = res.data.data.area;
        this.goodsSelectBox = res.data.data.goods;
        this.onlineSelectBox = res.data.data.onlineStudy;
        this.visitSelectBox = res.data.data.visiteStudy;
        this.paymentSelectBox = res.data.data.payment;
      }).catch(err =>{
        console.log(err);
      });


    }





  }
}
</script>


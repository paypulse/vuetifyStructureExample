<template>
  <v-form v-model="valid">
      <v-container class="grey lighten-5" fluid>
        <v-row no-gutters >
          <h1> 회원 관리 조회</h1>
        </v-row>

        <v-row align="center">
          <v-col cols="1">
             <v-subheader>지사</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-select v-model="areaSelected" :items="areaSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
          </v-col>
          <v-col cols="1">
            <v-subheader>센터</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-text-field disabled label="포텐"></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-subheader>상품</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-select v-model="goodsSelected" :items="goodsSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
          </v-col>
          <v-col cols="1">
            <v-subheader>납부현황</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-select v-model="paymentSelected" :items="paymentSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
          </v-col>
          <v-col cols="1">
            <v-subheader>온라인 교육 상태</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-select v-model="onlineSelected" :items="onlineSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
          </v-col>
          <v-col cols="1">
            <v-subheader>방문교육상태</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-select v-model="visitSelected" :items="visitSelectBox" item-value='codeCd' item-text="codeNm" return-object single-line></v-select>
          </v-col>
        </v-row>
        <!----  등록일 date picker ---->
        <v-row>
          <!---- start date ---->
            <v-col cols="12" lg="2" md="4">
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
          <v-col cols="12" lg="2" md="4">
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
                    label="Start Date"
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
          <!----- search bar---->
          <v-col cols="2" lg="2">
            <v-subheader>검색유형</v-subheader>
          </v-col>
          <v-col cols="2" lg="2">
            <v-select v-model="onlineSelected" :items="searchSelectBox" item-value='cd' item-text="cdNm" return-object single-line></v-select>
          </v-col>
          <v-col cols="2" lg="2">
            <v-text-field ></v-text-field>
          </v-col>

          <!--- 검색 버튼 --->
          <v-col cols="1" >
            <v-btn style="position: relative; left: 100%; top: 40%;" color="primary">조회</v-btn>
          </v-col>

        </v-row>

        <!----Grid List ---->
        <v-row>
          <v-data-table height="250px"
                        width="1000px"
                        :headers="headers"
                        v-model="customerSelected"
                        :items="customerGridList"
                        item-key="id"
                        class="elevation-1"
                        show-select
                        checkbox-color="red"
                        dense>
          </v-data-table>




        </v-row>


      </v-container>
  </v-form>
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
    searchSelectBox: [{cd: 10, cdNm:"계약자명"},{cd: 20, cdNm:"휴대전화번호코드"},
      {cd: 30,cdNm: "CRM 계약코드"}, {cd: 40, cdNm: "로그인ID"}],

    /* date picker */
    sDMenu : false,
    eDMenu : false,
    startDate :  new Date().toISOString().substr(0,10),
    endDate: new Date().toISOString().substr(0,10),
    iconfont: 'fa',
    icons: {iconfont: 'md'},
    /* Grid List */
    headers:[
      { text: 'No.', align: 'start', sortable: false, value: 'name', width: "10%"},
      { text: '지사', value: 'calories',width: "60px" },
      { text: '센터', value: 'fat',width: "60px"  },
      { text: '계약자 명', value: 'carbs',width: "90px"  },
      { text: '자녀 명', value: 'protein',width: "80px" },
      { text: '학습앱 회원ID', value: 'iron',width: "90px" },
      { text: 'ERP고객코드', value: 'iron',width: "90px" },
      { text: 'ERP계약 코드', value: 'iron',width: "90px" },
      { text: 'CRM 계약 코드', value: 'iron',width: "90px" },
      { text: '휴대전화번호', value: 'iron',width: "90px" },
      { text: '판매유형', value: 'iron',width: "90px" },
      { text: '상품', value: 'iron',width: "90px" },
      { text: '상품가격', value: 'iron',width: "90px"},
      { text: '약정 기간', value: 'iron',width: "90px" },
      { text: '온라인교육', value: 'iron',width: "90px" },
      { text: '방문교육', value: 'iron',width: "90px" },
      { text: '무료교육시작일', value: 'iron',width: "90px" },
      { text: '무료교육종료일', value: 'iron' ,width: "90px"},
      { text: '납부현황', value: 'iron',width: "90px" },
      { text: '계약서', value: 'iron' ,width: "90px"},
      { text: '등록일', value: 'iron' ,width: "90px"},

    ],
    customerGridList: [],
    customerSelected: [],
    valid: false
  }),
  mounted() {
    //select box init
    this.selectBoxInit();



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


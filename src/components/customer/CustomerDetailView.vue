<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters style="position: relative; left: 100px;">
      <h1> 회원 관리 상세</h1>
    </v-row>

    <v-row no-gutters>
      <h2>1. 기본 정보</h2>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>회원 번호</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;">{{custCd}}</v-subheader>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-subheader>회원 등록일</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{createAt}}</v-subheader>
      </v-col>

    </v-row>
    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>회원 명(계약자 명)</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{userNm}}</v-subheader>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>자녀 명</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;">{{childNm}}</v-subheader>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>주소</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;">{{addr}}</v-subheader>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>휴대 전화 번호</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{ hno1 }}</v-subheader>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>교과 토탈 학습앱 ID</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{ fCid }}</v-subheader>
      </v-col>
    </v-row>


    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>교과 토탈 부모앱 ID</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{ fPid }}</v-subheader>
      </v-col>
    </v-row>

    &nbsp;
    &nbsp;
    <v-row no-gutters>
      <h2>2. 상품 정보</h2>
    </v-row>
    <v-divider></v-divider>

    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>상품 명</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{ goodNm }}</v-subheader>
      </v-col>

      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-subheader>약정 기간</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{ agreementNm }}</v-subheader>
      </v-col>

    </v-row>

    <v-row no-gutters>
      <v-col cols="2">
        <v-subheader>학습 상태</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-subheader style="background-color: white; position: relative; top: 10%;" >{{ stuStat }}</v-subheader>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around">
      <v-btn depressed color="primary"  v-on:click="goCustomer">목록으로</v-btn>
    </v-row>



  </v-container>




</template>

<script>
export default {
  name: "CustomerDetailView",
  props:['detailInfo'],
  data :() =>({
    initDetail: '',
    custCd:'',
    userNm:'',
    childNm:'',
    fCid:'',
    fPid:'',
    goodNm:'',
    stuStat:'',
    createAt:'',
    detailItem:'',
    addr:'',
    hno1:'',
    agreementNm:''
  }),
  computed:{
    initData: function(){
      return this.detailInfo;
    }
  },
  mounted() {
    console.log(this.initData);
    this.custCd = this.initData.custCd;
    this.userNm = this.initData.userNm;
    this.childNm = this.initData.childNm;
    this.addr = this.initData.addr;
    this.hno1 = this.initData.hno1;
    this.fCid = this.initData.fCid;
    this.fPid = this.initData.fPid;
    this.createAt = this.initData.createAt;
    this.goodNm = this.initData.goodNm;
    this.stuStat = this.initData.stuStat;
    this.agreementNm = this.initData.agreementNm;

  },
  created() {


  },
  methods:{
    goCustomer: function(){
      this.$emit("goCustomer", 'CustomerView');

    }

  }
}
</script>

<style scoped>

</style>

<template>
  <v-container class="grey lighten-5" >
    <v-row no-gutters style="position: relative; left: 100px;" >
      <h1> 에러 로그 조회 </h1>
    </v-row>
    &nbsp;
    <v-row>
      <v-btn style="position: relative; left:84%;" color="primary" v-on:click="selectDeleteRow">삭제</v-btn>
      <v-btn style="position: relative; left:85%;" color="primary">전체 삭제</v-btn>
    </v-row>
    &nbsp;
    <v-row>
      <v-col>
        <v-data-table height="250px"
                      width="1000px"
                      :headers="headers"
                      v-model="selected"
                      :items="errorLogList"
                      item-key="id"
                      class="elevation-20"
                      show-select
                      checkbox-color="red"
                      dense
                      @click:row="selectRow">
        </v-data-table>
      </v-col>


    </v-row>

    &nbsp;&nbsp;
    <v-row style="position: relative; left: 100px;" >
      <v-form>

      </v-form>
     <v-list>
       <v-list-item>
         <v-list-item-action>
           <v-list-item-title>ErrorTime</v-list-item-title>
         </v-list-item-action>
<!--         <v-divider vertical="true"></v-divider>-->
         &nbsp;&nbsp;
         <v-list-item-content>
           <span>{{ errorTime }}</span>
         </v-list-item-content>
         &nbsp;&nbsp;
         <v-list-item-action>
           <v-list-item-title>Message</v-list-item-title>
         </v-list-item-action>
         &nbsp;&nbsp;
         <v-list-item-content>
           <span>{{ selectMsg }}</span>
         </v-list-item-content>
       </v-list-item>

     </v-list>
<!--      <v-btn @click="printT">Test Environment</v-btn>-->

    </v-row>

  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ErrorLogView",
  data: () =>({
    headers: [
      { text: 'ID'          , value: 'id'            ,width: "80px" , align:'center', sortable: true, class: "primary white--text"},
      { text: 'errorTime'   , value: 'errorTime'     ,width: "120px", align:'center', sortable: true, class: "primary white--text"},
      { text: 'message'     , value: 'message'       ,width: "250px", align:'center', sortable: true, class: "primary white--text"},
      { text: 'logPath'     , value: 'logPath'       ,width: "100px", align:'center', sortable: true, class: "primary white--text"},
      { text: 'phase'       , value: 'phase'         ,width: "90px" , align:'center', sortable: true, class: "primary white--text"},
      { text: 'systemN'     , value: 'systemN'       ,width: "100px", align:'center', sortable: true, class: "primary white--text"}
    ],
    errorLogList : [],
    selected:[],
    errorLogIds: [],
    selectMsg:'',
    errorTime:'',
    totalCnt: 0,
    config:''
  }),
  created() {
    this.initData();

  },
  updated() {
    console.log(this.selected);
    //delete Row
    this.deleteRow(this.selected);
    //delete All row


  },
  methods: {
    initData: function(){
      // axios.get("http://192.168.50.218:8084/loggerMenu/loggerGridList").then(res =>{
      //   this.errorLogList = res.data.data;
      //   this.totalCnt = res.data.processCnt;
      //   console.log(this.totalCnt);
      //
      // }).catch(err =>{
      //   console.log(err);
      // });

      console.log(this.$store.state.token);


      this.$http.get(process.env.VUE_APP_SERVER_URL+"/loggerMenu/loggerGridList",
          {headers: { "jwtAuthToken": this.$store.state.token}} )
      .then(res =>{
        console.log(res);
        this.errorLogList = res.data.data;
      }).catch(err =>{
        console.log(err);
      });

    },
    selectRow: function(e){
      console.log(e);
      this.errorTime = e.errorTime;
      this.selectMsg = e.message;
    },
    deleteRow: function(rows){
      this.errorLogIds = [];
      rows.forEach(d =>{
        this.errorLogIds.push(d.id);
      })

    },
    deleteAllRow: function(){

    },
    selectDeleteRow: function(){

      console.log("check errorItem : ",this.errorLogIds);
      if(this.errorLogIds.length <=0){
        alert("삭제할 item을 선택해 주세요");
        return;
      }

      axios.post(process.env.VUE_APP_SERVER_URL+"/loggerMenu/loggerDeleteRow",{"loggerId":this.errorLogIds})
      .then(res =>{
        console.log(res.data.status);
        alert("삭제  ", res.data.status);
        this.initData();

        //화면 refresh인데 추후 다시 봐야될거 같다.
        this.$router.go();
      }).catch(err =>{
        alert(err);
      });

    },
    printT : function(){
      console.log(process.env);
    }

  }
}
</script>

<style scoped>

</style>

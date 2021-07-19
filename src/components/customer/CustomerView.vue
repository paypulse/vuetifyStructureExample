<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>

      <v-col  xs="1" sm="1">
        <span>지사 </span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2" >
        <v-select :items="items" dense></v-select>
      </v-col>

      <v-col  xs="1" sm="1"  offset-md="1">
        <span>센터 </span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2" >
        <v-select :items="items" dense></v-select>
      </v-col>

      <v-col  xs="1" sm="1"  offset-md="1">
        <span>상품</span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2">
        <v-select :items="items" dense></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col  xs="1" sm="1"  >
        <span>납부현황</span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2">
        <v-select :items="items" dense></v-select>
      </v-col>

      <v-col  xs="1" sm="1"  offset-md="1">
        <span>온라인 교육상태 </span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2" >
        <v-select :items="items" dense></v-select>
      </v-col>

      <v-col  xs="1" sm="1"  offset-md="1">
        <span>방문교육상태</span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2">
        <v-select :items="items" dense></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="1" sm="1" >
        <span>등록일</span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2">
        <v-menu v-model="menu2" :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      ~
      <v-col class="d-flex" xs="2" sm="2">
        <v-menu v-model="menu2" :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="1" sm="1" >
        <span>검색유형</span>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2" >
        <v-select :items="items" dense></v-select>
      </v-col>
      <v-col class="d-flex" xs="2" sm="2"  offset-md="7">
        <v-btn class="ma-2" tile color="indigo" dark>조회</v-btn>
      </v-col>
    </v-row>

    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        item-key="name"
        show-select
        class="elevation-1"
    >
      <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>
    </v-data-table>


  </v-container>
</template>

<script>
export default {
  name: "CustomerView",
  data: () =>({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
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

    ]
  }),
  created() {
  },
  computed:{

  }
}
</script>


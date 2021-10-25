<template>
<!--  -->
  <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp"   app>
    <v-list dense>
      <template v-for="item in menuList">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
<!--            <a href="#!" class="body-2 black&#45;&#45;text">EDIT</a>-->
          </v-col>
        </v-row>

        <!-----DEPTH가 있는 메뉴  ---->
        <v-list-group v-else-if="item.subItems" :key="item.text" v-model="item.model"
          append-icon="mdi-chevron-down" :prepend-icon="item.model ? item.icon : item['icon-alt']" v-on:click="selectMenu(item.path)"  >
          <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title >
                    {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.subItems" :key="subItem.text" v-on:click="selectMenu(subItem.path)"  link>
             <v-list-item-content>
               <v-list-item-title style="text-align: center"> {{ subItem.text }} </v-list-item-title>
             </v-list-item-content>
          </v-list-item>
        </v-list-group>


        <!---- DEPTH가 없는 메뉴 ----->
        <v-list-item v-else :key="item.text" v-on:click="selectMenu(item.path)"  link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </template>

    </v-list>
  </v-navigation-drawer>
</template>
<script>

export default{
  name: "Menu",
  data: () =>({
    // menuList: [], --> 추후 API로 값을 가져올 곳
    eventBus: '',
    menuList: [
      { icon: 'mdi-contacts','icon-alt':'mdi-contacts', text: '회원 관리',
        model:false, path:'CustomerView',
        subItems:[
          {icon: 'mdi-files', text: '회원관리',path:'CustomerView'}
      ]},
      // List Group Example
      // { icon: 'mdi-home',
      //   'icon-alt': 'mdi-home', text:'사용자 관리',
      //   model: false,
      //   path:'',
      //   subItems:[
      //       {icon:'mdi-files' , text: 'child1', path:'child1'},
      //       {icon:'mdi-files' , text: 'child2', path:'child2' }
      //   ]
      // },

      { icon: 'mdi-cog','icon-alt':'mdi-cog', text: '시스템 관리',
        model:false, path:'ErrorLogView',
        subItems:[
          {icon:'mdi-files' , text: '에러 로그 관리', path:'ErrorLogView'},
          {icon:'mdi-files' , text: '공통 코드 관리', path:'comCodeView'}
          // {icon:'mdi-files' , text: '메뉴 관리' , path:'MenuSetting'}
        ]},
      // { icon: 'mdi-keyboard', text: '납부관리', path:'' }
      { icon: 'mdi-contacts','icon-alt':'mdi-contacts', text: '테스트 메뉴',
        model:false, path:'TestPage',
        subItems:[
          {icon: 'mdi-files', text: '파일 업로드/다운로드',path:'TestPage'}
      ]},

    ]
  }),
  mounted() {

    //console.log(this.menuList);
  },
  methods: {
    selectMenu : function(data){
      //Menu -> contents component setting
    //  console.log(data);
     // console.log(data);
     this.$root.$emit("menuItem",data);
     this.$emit("menuItem",data);


    }
  }


};
</script>


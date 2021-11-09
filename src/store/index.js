import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userNm: '',
    userCd: '',
    token: ''
  },
  mutations: {

  },
  actions: {

    login({commit}, loginObj){
        console.log({commit});
        console.log(loginObj);
        // login check 에 해당 되는 부분들이 여기 재정의

    }

  },
  modules: {

  },
  plugins:[
      createPersistedState({
      })
  ]

})




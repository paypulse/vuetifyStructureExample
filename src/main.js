import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

//css 파일
import '@/assets/css/app.css';

import vuetify from './plugins/vuetify'


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

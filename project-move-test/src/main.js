import 'babel-polyfill'
import './assets/hotcss/hotcss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
// import vConsole from 'vconsole'
// import 'lib-flexible'

fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
